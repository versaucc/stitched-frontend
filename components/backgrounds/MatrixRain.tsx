// components/MatrixRain.tsx
'use client'

import React, { useEffect, useRef } from 'react'

// The word we’ll stamp into each eligible column
const STITCHED = 'stitched'

// All the possible glyphs
const LATIN_CHARS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~'
const KATAKANA_CHARS = [
  'ｦ','ｧ','ｨ','ｩ','ｪ','ｫ','ｬ','ｭ','ｮ','ｯ','ｱ','ｲ','ｳ','ｴ','ｵ',
  'ｶ','ｷ','ｸ','ｹ','ｺ','ｻ','ｼ','ｽ','ｾ','ｿ','ﾀ','ﾁ','ﾂ','ﾃ','ﾄ',
  'ﾅ','ﾆ','ﾇ','ﾈ','ﾉ','ﾊ','ﾋ','ﾌ','ﾍ','ﾎ','ﾏ','ﾐ','ﾑ','ﾒ','ﾓ',
  'ﾔ','ﾕ','ﾖ','ﾗ','ﾘ','ﾙ','ﾚ','ﾛ','ﾜ','ﾝ',
].join('')

// Stream angles (in degrees→radians)
const ANGLE_MAP = [35, 30, 45, 53, 5, 15, -35, -30, -45, -53, 0, 1].map(
  (d) => (d * Math.PI) / 180
)

// px between columns
const COLUMN_SPACING = 40

interface Drop {
  x: number
  y: number
  speed: number
  angle: number
  chars: string[]
  changeFreq: number
  katakanaRatio: number
  length: number
  index: number

  // has “stitched” been stamped yet?
  stitchedDone: boolean
  // which indices hold the STITCHED letters
  stitchedPositions: number[]
}

export default function MatrixRain(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const frameRef = useRef<number>()

  // choose a random glyph based on ratio
  const getRandomChar = (k: number): string =>
    Math.random() < k
      ? KATAKANA_CHARS[Math.floor(Math.random() * KATAKANA_CHARS.length)]
      : LATIN_CHARS[Math.floor(Math.random() * LATIN_CHARS.length)]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // full-screen + devicePixelRatio support
    let w = window.innerWidth
    let h = window.innerHeight
    const dpr = window.devicePixelRatio || 1
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    // initialize drops
    const cols = Math.floor(w / COLUMN_SPACING)
    const drops: Drop[] = Array.from({ length: cols }).map((_, i) => {
      const angle = ANGLE_MAP[Math.floor(Math.random() * ANGLE_MAP.length)]
      const length = 10 + Math.floor(Math.random() * 20)  // 10–29 chars
      const kRatio = 0.6 + Math.random() * 0.3            // 60–90% katakana
      return {
        x: i * COLUMN_SPACING,
        y: -Math.random() * h,
        speed: 20 + Math.random() * 80,                   // slower overall
        angle,
        length,
        changeFreq: 0.05 + Math.random() * 0.1,
        katakanaRatio: kRatio,
        chars: Array.from({ length }).map(() => getRandomChar(kRatio)),
        index: i,
        stitchedDone: false,
        stitchedPositions: [],
      }
    })
    dropsRef.current = drops

    let last = performance.now()
    const start = last

    const render = (now: number) => {
      // 600 ms startup delay
      if (now - start < 600) {
        frameRef.current = requestAnimationFrame(render)
        return
      }

      const dt = (now - last) / 1000
      last = now

      // draw translucent black for trails
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, 0, w, h)
      ctx.textBaseline = 'top'

      dropsRef.current.forEach((drop) => {
        // move stream
        drop.y += drop.speed * dt

        // if off-screen, reset
        if (drop.y > h + drop.length * 16) {
          drop.y = -drop.length * 16
          drop.speed = 10 + Math.random() * 40
          if (Math.random() > 0.8) {
            drop.angle = ANGLE_MAP[Math.floor(Math.random() * ANGLE_MAP.length)]
          }
          drop.chars = Array.from({ length: drop.length }).map(() =>
            getRandomChar(drop.katakanaRatio)
          )
          // reset stitched flag
          drop.stitchedDone = false
          drop.stitchedPositions = []
        }

        // protect any stitched slots from random swaps
        const special = new Set<number>(drop.stitchedPositions)
        for (let idx = 0; idx < drop.chars.length; idx++) {
          if (special.has(idx)) continue
          if (Math.random() < drop.changeFreq) {
            drop.chars[idx] = getRandomChar(drop.katakanaRatio)
          }
        }

        // STITCHED: stamp in as soon as head enters, one-shot per cycle
        if (drop.index % 2 === 0 && !drop.stitchedDone && drop.y >= 8) {
          const maxOffset = Math.max(0, drop.length - STITCHED.length)
          const offset = Math.floor(Math.random() * (maxOffset + 1))
          const positions = Array.from({ length: STITCHED.length }).map(
            (_, j) => offset + j
          )
          drop.stitchedPositions = positions
          // override chars
          positions.forEach((pos, j) => {
            if (pos < drop.chars.length) {
              drop.chars[pos] = STITCHED[j]
            }
          })
          drop.stitchedDone = true
        }

        // draw the column
        ctx.save()
        ctx.translate(drop.x, drop.y)
        ctx.rotate(drop.angle)

        const highlight = new Set<number>(drop.stitchedPositions)

        for (let idx = 0; idx < drop.chars.length; idx++) {
          const char = drop.chars[idx]
          const alpha = idx / drop.length

          if (highlight.has(idx)) {
            // bold + cyan glow for STITCHED
            ctx.font = ' 44px monospace'
            ctx.fillStyle = 'rgba(255, 0, 0, 0.85)'
            ctx.shadowColor = 'rgba(32, 166, 228, 0.75)'
            ctx.shadowBlur = 12
          } else {
            // normal red tail
            ctx.font = '44px monospace'
            ctx.fillStyle = `rgba(180,0,0,${alpha})`
            ctx.shadowBlur = 0
          }

          ctx.fillText(char, 0, idx * 32)
        }

        ctx.restore()
      })

      frameRef.current = requestAnimationFrame(render)
    }

    frameRef.current = requestAnimationFrame(render)

    // handle resize
    const onResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameRef.current!)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // absolutely fill viewport behind your UI
  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}
