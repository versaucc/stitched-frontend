'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IncrementStepCount } from './IncrementStepCount'
import { supabase } from '../../lib/supabase'

export default function FredQuestionTwo({
  onComplete,
  setMannequinSettings
}: {
  onComplete: () => void,
  setMannequinSettings: (settings: {
    height: number;
    waist: number;
    thickThighs: boolean;
  }) => void
}) {
  const [height, setHeight] = useState(0)
  const [waist, setWaist] = useState(0)
  const [inseam, setInseam] = useState(0)
  const [thickThighs, setThickThighs] = useState(false)
  const [fatTiddays, setFatTiddays] = useState(false) // optional extra field

useEffect(() => {
  if (!(height && waist)) return

  const handleUpdate = async () => {
    const session_id = localStorage.getItem('custom_session_id')
    if (!session_id) {
      console.error('No session ID found in localStorage')
      return
    }

    const { error } = await supabase
      .from('custom_orders')
      .update({
        question2_result: { height, waist, inseam, thickThighs }
      })
      .eq('session_id', session_id)

    if (error) {
      console.error('Failed to update custom order:', error)
      return
    }

    // Only run these after successful update
    await IncrementStepCount()
    onComplete()
  }

  handleUpdate()
}, [height, waist, inseam, thickThighs])


  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-8">

      {/* Sliders and Checkboxes */}
      <div className="flex flex-col space-y-6 w-64">
        <div>
          <label className="block mb-1 text-sm text-white">Height: {height || '--'} inches</label>
          <input
            type="range"
            min="48"
            max="98"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-white">Waist: {waist || '--'} inches</label>
          <input
            type="range"
            min="24"
            max="44"
            value={waist}
            onChange={(e) => setWaist(Number(e.target.value))}
            className="w-full"
          />
        </div>

                <div>
          <label className="block mb-1 text-sm text-white">Inseam: {inseam || '--'} inches</label>
          <input
            type="range"
            min="10"
            max="28"
            value={inseam}
            onChange={(e) => setInseam(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="thick-thighs"
            checked={thickThighs}
            onChange={(e) => setThickThighs(e.target.checked)}
            className="accent-green-500 w-5 h-5"
          />
          <label htmlFor="thick-thighs" className="text-white text-sm">
            Thick thighs?
          </label>
        </div>
      </div>
    </div>
  )
}

