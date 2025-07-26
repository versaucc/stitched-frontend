// components/StitchSilhouette.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)

export default function StitchSilhouette() {
  const silRef = useRef<SVGPathElement>(null)
  const rayRefs = useRef<SVGPathElement[]>([])

  useEffect(() => {
    if (!silRef.current) return

    // 1) Prepare silhouette
    const silLen = silRef.current.getTotalLength()
    gsap.set(silRef.current, {
      strokeDasharray: silLen,
      strokeDashoffset: silLen,
    })

    // 2) Prepare each ray
    rayRefs.current.forEach((ray) => {
      const len = ray.getTotalLength()
      gsap.set(ray, {
        strokeDasharray: len,
        strokeDashoffset: len,
        opacity: 0,
      })
    })

    // 3) Timeline
    const tl = gsap.timeline()
    tl.to(silRef.current, {
      drawSVG: '100%',
      duration: 2,
      ease: 'power1.out',
    })

    // 4) Stagger rays in
    tl.to(
      rayRefs.current,
      {
        drawSVG: '100%',
        opacity: 1,
        duration: 1,
        ease: 'power1.out',
        stagger: 0.2,
      },
      '>-0.5' // start 0.5s before silhouette ends
    )
  }, [])

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <svg
        viewBox="0 0 800 1200"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="chain" patternUnits="userSpaceOnUse" width="6" height="6">
            <path
              d="M0,3 C1.5,0 4.5,0 6,3 C4.5,6 1.5,6 0,3"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>

        {/* silhouette */}
        <path
          ref={silRef}
          d="
            M200,100
            L600,100
            L650,1100
            L500,1100
            L500,600
            L300,600
            L300,1100
            L150,1100
            Z
          "
          fill="none"
          stroke="url(#chain)"
          strokeWidth="4"
        />

        {/* rays */}
        {[
          'M400,600 L50,600',
          'M400,600 L750,600',
          'M400,600 L400,50',
          'M400,600 L400,1150',
          'M400,600 L800,400',
          'M400,600 L800,800',
          'M400,600 L0,400',
          'M400,600 L0,800',
        ].map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              if (el) rayRefs.current[i] = el
            }}
            d={d}
            fill="none"
            stroke="url(#chain)"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  )
}
