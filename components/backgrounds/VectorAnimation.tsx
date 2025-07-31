'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)

import Vector from '../../public/vectors/home-page-vector-black-red.svg'
import '../../styles/vectorbg.css'

interface VectorAnimationProps {
  reverse?: boolean
  onReverseComplete?: () => void
}

export default function VectorAnimation({ reverse = false, onReverseComplete }: VectorAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = Array.from(
      svgRef.current.querySelectorAll('path')
    ) as SVGPathElement[]

    const drawDuration = 10
    const totalStagger = 5
    const animationEase = 'power1.out'

    const infos = paths.map((path) => {
      const len = path.getTotalLength()
      gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: reverse ? 0 : len,
        visibility: 'visible',
      })
      const { x } = path.getBBox()
      return { path, x }
    })

    infos.sort((a, b) => a.x - b.x)
    const sortedPaths = infos.map((i) => i.path)

    let tl: gsap.core.Timeline

    if (reverse) {
      tl = gsap.timeline()
        .to(sortedPaths, {
          strokeDashoffset: (i: number, target: SVGPathElement) => target.getTotalLength(),
          duration: drawDuration,
          ease: animationEase,
          stagger: {
            amount: totalStagger,
            from: 0,
          },
          onComplete: onReverseComplete,
        })
    } else {
      tl = gsap.timeline()
        .to(sortedPaths, {
          strokeDashoffset: 0,
          duration: drawDuration,
          ease: animationEase,
          stagger: {
            amount: totalStagger,
            from: 0,
          },
        })
    }

    return () => {
      tl && tl.kill()
    }
  }, [reverse, onReverseComplete])

  return (
    <div>
      <Vector
        className="vector-bg"
        ref={svgRef}
        style={{ visibility: 'hidden' }}
      />
    </div>
  )
}