'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IncrementStepCount } from './IncrementStepCount'
import { supabase } from '../../lib/supabase'

export default function FredQuestionThree({
  onComplete,
}: {
  onComplete: () => void
}) {
  const [washType, setWashType] = useState('')
  const [solidColor, setSolidColor] = useState('#000000')
  const [twoToneFront, setTwoToneFront] = useState('#000000')
  const [twoToneSide, setTwoToneSide] = useState('#ffffff')

useEffect(() => {
  const handleUpdate = async () => {
    const session_id = localStorage.getItem('custom_session_id')
    if (!session_id) {
      console.error('No session ID found in localStorage')
      return
    }

    let payload: any = { washType }

    // Only proceed if washType is valid
    if (washType === 'solid-color' && solidColor) {
      payload.solidColor = solidColor
    } else if (
      washType === 'two-tone' &&
      twoToneFront &&
      twoToneSide
    ) {
      payload.twoToneFront = twoToneFront
      payload.twoToneSide = twoToneSide
    } else if (washType !== 'solid-color' && washType !== 'two-tone') {
      // For non-special case wash types like "acid wash", "distressed", etc
      // No additional values needed
    } else {
      // Invalid/incomplete input — don't proceed
      return
    }

    const { error } = await supabase
      .from('custom_orders')
      .update({ question3_result: payload })
      .eq('session_id', session_id)

    if (error) {
      console.error('Failed to update question3_result:', error)
      return
    }

    await IncrementStepCount()
    onComplete()
  }

  handleUpdate()
}, [washType, solidColor, twoToneFront, twoToneSide])


  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-8 w-full">

      {/* Menu Options */}
      <div className="flex flex-col space-y-4 w-64">
        <label className="text-white text-sm mb-1">Wash Type</label>
        <select
          value={washType}
          onChange={(e) => setWashType(e.target.value)}
          className="p-2 rounded bg-white text-black"
        >
          <option value="">Select a style...</option>
          <option value="light-wash">Light Wash</option>
          <option value="medium-wash">Medium Wash</option>
          <option value="dark-wash">Dark Wash</option>
          <option value="solid-color">Solid Color</option>
          <option value="two-tone">Two-Tone</option>
        </select>

        {/* Solid Color Picker */}
        {washType === 'solid-color' && (
          <div className="flex flex-col space-y-2">
            <label className="text-white text-sm">Choose Color</label>
            <input
              type="color"
              value={solidColor}
              onChange={(e) => setSolidColor(e.target.value)}
              className="w-16 h-10 p-0 border-2 border-white rounded-full"
            />
          </div>
        )}

        {/* Two-Tone Color Pickers */}
        {washType === 'two-tone' && (
          <div className="flex flex-col space-y-4">
            <div>
              <label className="text-white text-sm">Front Panel Color</label>
              <input
                type="color"
                value={twoToneFront}
                onChange={(e) => setTwoToneFront(e.target.value)}
                className="w-16 h-10 p-0 border-2 border-white rounded-full"
              />
            </div>
            <div>
              <label className="text-white text-sm">Side Panel Color</label>
              <input
                type="color"
                value={twoToneSide}
                onChange={(e) => setTwoToneSide(e.target.value)}
                className="w-16 h-10 p-0 border-2 border-white rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
