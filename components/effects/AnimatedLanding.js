"use client";

import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/navigation'
import FuzzyText from './text/FuzzyText';

export default function App() {
  const canvasRef = useRef(null)
  const [dissolveStarted, setDissolveStarted] = useState(false)
  const [navbarBuilt, setNavbarBuilt] = useState(false)
  const [showEnter, setShowEnter] = useState(false)

  const chunkSize = 5
  const gravity = -9
  const chunksPerSecond = 100
  const velocity = 1

  const buttonChunkSize = 6
  const pixelsPerFrame = 900

  const [clickCount, setClickCount] = useState(0)
  const router = useRouter()

  const handleClick = () => {
    if (clickCount === 0) {
      setClickCount(1)
      // ✅ Start animation manually on first click
      const canvas = canvasRef.current
      if (canvas && typeof canvas.animateStart === 'function') {
        canvas.animateStart()
      } else {
        // fallback: simulate click on canvas to start
        canvas.dispatchEvent(new MouseEvent("click", { bubbles: true }))
      }
        // Delay enter button appearance
        setTimeout(() => {
          setShowEnter(true)
        }, 200)
    } else if (clickCount === 1) {
      router.push('/fred')
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const cx = canvas.width / 2
    const cy = canvas.height / 2

    const circlePixels = []
    let droppedChunks = []
    let navbarChunks = []
    let homeButtonPixels = []
    let shopButtonPixels = []
    let aboutButtonPixels = []
    let homeCursor = 0
    let shopCursor = 0
    let aboutCursor = 0
    let frame = 0
    let animationFrame

    const spacing = chunkSize + 1
    const navbarHeight = 200
    const navbarOffset = 0
    const borderThickness = 1

    const buttonY = navbarOffset 
    const buttonWidth = 540
    const buttonHeight = 288
    const spacingBetween = 1

    const totalButtonWidth = 3 * buttonWidth + 2 * spacingBetween
    const startX = (canvas.width - totalButtonWidth) / 2

    const homeX = startX
    const shopX = startX + buttonWidth + spacingBetween
    const aboutX = startX + 2 * (buttonWidth + spacingBetween)


     const drawInitialLogo = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      circlePixels.forEach(p => {
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, chunkSize, chunkSize)
      })
    }

    const logo = new Image()
    logo.src = "/navbar/stitched_static_graffiti_white_invert.png"
    logo.onload = () => {
      const offCanvas = document.createElement("canvas")
      offCanvas.width = canvas.width
      offCanvas.height = canvas.height
      const offCtx = offCanvas.getContext("2d")
      offCtx.drawImage(logo, 0, 0, canvas.width, canvas.height)

      const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height)

      for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
          const i = (y * canvas.width + x) * 4
          const r = imageData.data[i]
          const g = imageData.data[i + 1]
          const b = imageData.data[i + 2]
          const a = imageData.data[i + 3]

          if (a > 50) {
            const dx = x - cx
            const dy = y - cy
            const angle = Math.atan2(dy, dx)
            const dist = Math.sqrt(dx * dx + dy * dy)

            circlePixels.push({
              x,
              y,
              angle,
              r: dist,
              spawned: false,
              color: `rgba(${r}, ${g}, ${b}, ${a / 255})`
            })
          }
        }
      }

      circlePixels.sort((a, b) => a.r - b.r)


      const spawnChunks = () => {
        const toSpawn = circlePixels.filter(p => !p.spawned).slice(0, chunksPerSecond)
        toSpawn.forEach(p => {
          p.spawned = true
          droppedChunks.push({
            x: p.x,
            y: p.y,
            vx: velocity * Math.cos(p.angle),
            vy: velocity * Math.sin(p.angle),
            t: 0,
            opacity: 1,
            color: p.color
          })
        })
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        circlePixels.forEach(p => {
          if (!p.spawned) {
            ctx.fillStyle = p.color
            ctx.fillRect(p.x, p.y, chunkSize, chunkSize)
          }
        })

        const navbarTop = canvas.height - navbarHeight - navbarOffset

        droppedChunks.forEach(chunk => {
          chunk.t += 1 / 30
          chunk.vy += gravity * (1 / 30)
          chunk.x += chunk.vx
          chunk.y += chunk.vy

          const x = chunk.x
          const y = chunk.y

          const inBottomBorder =
            y >= canvas.height - borderThickness - navbarOffset &&
            y <= canvas.height - navbarOffset

          const inTopBorder =
            y >= navbarTop &&
            y <= navbarTop + borderThickness

          if (inBottomBorder || inTopBorder) {
            navbarChunks.push({ x, y, color: chunk.color })
            chunk.opacity = 1
          }
        })

        droppedChunks = droppedChunks.filter(
          c => c.opacity > 0 &&
               c.x >= -chunkSize &&
               c.x <= canvas.width + chunkSize &&
               c.y <= canvas.height + chunkSize
        )

        droppedChunks.forEach(chunk => {
          ctx.fillStyle = chunk.color
          ctx.fillRect(chunk.x, chunk.y, chunkSize, chunkSize)
        })

        const revealPixels = (pixelArray) => {
          pixelArray.forEach(p => {
            if (p.visible) {
              ctx.fillStyle = p.color
              ctx.fillRect(p.x, p.y, buttonChunkSize, buttonChunkSize)
            }
          })
        }

        function updateChunkedVisibility(pixelArray, cursorRef) {
          let cursor = cursorRef.current
          let count = 0
          while (cursor < pixelArray.length && count < pixelsPerFrame) {
            const pixel = pixelArray[cursor]
            if (!pixel.visible) {
              for (let j = 0; j < droppedChunks.length; j++) {
                const chunk = droppedChunks[j]
                const dx = chunk.x - pixel.x
                const dy = chunk.y - pixel.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < chunkSize) {
                  pixel.visible = true
                  break
                }
              }
            }
            cursor++
            count++
          }
          cursorRef.current = cursor
        }

        updateChunkedVisibility(homeButtonPixels, { current: homeCursor })
        updateChunkedVisibility(shopButtonPixels, { current: shopCursor })
        updateChunkedVisibility(aboutButtonPixels, { current: aboutCursor })

        if ((navbarChunks.length + homeButtonPixels.length + shopButtonPixels.length + aboutButtonPixels.length) > 200 && !navbarBuilt) {
          setNavbarBuilt(true)
        }

        if (frame % 1 === 0 && circlePixels.some(p => !p.spawned)) {
          spawnChunks()
        }

        frame++
        animationFrame = requestAnimationFrame(animate)
      }

      drawInitialLogo()

      canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const clickY = e.clientY - rect.top

        circlePixels.forEach(p => {
          const dx = p.x - clickX
          const dy = p.y - clickY
          p.distFromClick = Math.sqrt(dx * dx + dy * dy)
        })

        if (!animationFrame) {
          animationFrame = requestAnimationFrame(animate)
        }
      }
    }

    return () => cancelAnimationFrame(animationFrame)
  }, [])



  return (
    
    <div
      onClick={handleClick}
      className="relative min-h-screen bg-black flex justify-center items-center cursor-pointer"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 w-full h-full"
      />

      {/* Fade-in Enter Text */}
      <div
        className={`top-100 z-10 text-white w-350 h-auto transition-opacity duration-500 ${
          showEnter ? 'opacity-100' : 'opacity-0'
        }`}
      >
       <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={1}
          enableHover={true}
        >
          Enter
        </FuzzyText>
      </div>
    </div>
  )

}

