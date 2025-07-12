'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IncrementStepCount } from './IncrementStepCount'
import { supabase } from '../../lib/supabase'

const SILHOUETTE_OPTIONS = [
  { id: 'SilhouetteOne', src: '/fred/silhouettes/silhouette-loose.png', alt: 'Loose' },
  { id: 'SilhouetteTwo', src: '/fred/silhouettes/silhouette-baggy.png', alt: 'Baggy' },
  { id: 'SilhouetteThree', src: '/fred/silhouettes/silhouette-ultra-baggy.png', alt: 'Ultra-Baggy' },
]

export default function FredCombinedCustomizer({ onComplete }: { onComplete: () => void }) {
  const [silhouette, setSilhouette] = useState<string | null>(null)
  const [waist, setWaist] = useState(30)
  const [inseam, setInseam] = useState(28)
  const [thickThighs, setThickThighs] = useState(false)
  const [washType, setWashType] = useState('')
  const [solidColor, setSolidColor] = useState('#000000')
  const [twoToneFront, setTwoToneFront] = useState('#000000')
  const [twoToneSide, setTwoToneSide] = useState('#ffffff')

  const allReady = silhouette && washType

  useEffect(() => {
    if (!allReady) return

    const submitToSupabase = async () => {
      const session_id = localStorage.getItem('custom_session_id')
      if (!session_id) return console.error('Missing session ID')

      const question1_result = silhouette
      const question2_result = { waist, inseam, thickThighs }

      const question3_result: any = { washType }
      if (washType === 'solid-color') {
        question3_result.solidColor = solidColor
      } else if (washType === 'two-tone') {
        question3_result.twoToneFront = twoToneFront
        question3_result.twoToneSide = twoToneSide
      }

      const { error } = await supabase
        .from('custom_orders')
        .update({
          question1_result,
          question2_result,
          question3_result,
        })
        .eq('session_id', session_id)

      if (error) {
        console.error('❌ Failed to update combined fields:', error)
        return
      }

      await IncrementStepCount()
      onComplete()
    }

    submitToSupabase()
  }, [silhouette, waist, inseam, thickThighs, washType, solidColor, twoToneFront, twoToneSide])

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-8">

      {/* ─── Silhouettes ─── */}
      <div className="flex justify-center gap-8">
        {SILHOUETTE_OPTIONS.map((opt) => (
          <div
            key={opt.id}
            onClick={() => setSilhouette(opt.id)}
            className={`cursor-pointer border-4 rounded transition-all ${
              silhouette === opt.id ? 'border-green-400 scale-105' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image src={opt.src} alt={opt.alt} width={90} height={180} />
          </div>
        ))}
      </div>

      {/* ─── Controls Layout ─── */}
      <div className="flex flex-col md:flex-row justify-center w-full max-w-5xl gap-8">

        {/* Left Column: Sliders */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <div>
            <label className="block text-sm text-white mb-1">Waist: {waist} in</label>
            <input type="range" min={24} max={44} value={waist} onChange={(e) => setWaist(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Inseam: {inseam} in</label>
            <input type="range" min={10} max={40} value={inseam} onChange={(e) => setInseam(Number(e.target.value))} className="w-full" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="thickThighs" checked={thickThighs} onChange={(e) => setThickThighs(e.target.checked)} />
            <label htmlFor="thickThighs" className="text-white text-sm">Thick thighs?</label>
          </div>
        </div>

        {/* Right Column: Wash Type */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <label className="text-white text-sm">Wash Type</label>
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

          {/* Wash Previews */}
          {washType === 'solid-color' && (
            <div className="flex items-center gap-3">
              <label className="text-white text-sm">Color</label>
              <input type="color" value={solidColor} onChange={(e) => setSolidColor(e.target.value)} className="rounded-full border-2 border-white w-12 h-12" />
            </div>
          )}

          {washType === 'two-tone' && (
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <label className="text-white text-sm">Front</label>
                <input type="color" value={twoToneFront} onChange={(e) => setTwoToneFront(e.target.value)} className="rounded-full border-2 border-white w-12 h-12" />
              </div>
              <div className="flex flex-col items-center">
                <label className="text-white text-sm">Side</label>
                <input type="color" value={twoToneSide} onChange={(e) => setTwoToneSide(e.target.value)} className="rounded-full border-2 border-white w-12 h-12" />
              </div>
            </div>
          )}

          {['light-wash-preview', 'medium-wash-preview', 'dark-wash-preview'].includes(washType) && (
            <div className="mt-2">
              <Image
                src={`/fred/${washType}.png`}
                alt={`${washType} preview`}
                width={120}
                height={120}
                className="border-2 border-white rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
