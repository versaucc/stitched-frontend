'use client'

import React from 'react'
import './FredMannequin.css'

export default function FredMannequin({
  height = 66,
  waist = 30,
  thickThighs = false
}: {
  height: number
  waist: number
  thickThighs: boolean
}) {
  const heightScale = height / 66 // base height is 66 inches
  const waistScale = waist / 30  // base waist is 30 inches
  const thighClass = thickThighs ? 'thick-thighs' : ''

  return (
    <div className="mannequin-container">
      <div
        className={`mannequin ${thighClass}`}
        style={{
          transform: `scaleY(${heightScale}) scaleX(${waistScale})`
        }}
      >
        <div className="head" />
        <div className="torso" />
        <div className="legs" />
      </div>
    </div>
  )
}

