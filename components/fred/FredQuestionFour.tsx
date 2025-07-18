'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from '../../lib/supabase'
import { IncrementStepCount } from './IncrementStepCount'

const PATCH_OPTIONS = [
  { label: 'Stitched S', image: '/fred/patches/S-Logo.png' },
  { label: 'Stitched Graffiti', image: '/fred/patches/stitched-purple-yellow.png' },
  { label: 'Fred', image: '/fred/patches/fred-og-logo.png' },
  { label: 'None', image: '' },
]

export const SELECT_POSITIONS_FRONT = [
  { id: 'left-bottom', start: { x: '20%', y: '95%' }, end: { x: '34%', y: '90%' } },
  { id: 'right-bottom', start: { x: '73%', y: '95%' }, end: { x: '66%', y: '90%' } },
  { id: 'left-pocket', start: { x: '30%', y: '20%' }, end: { x: '34%', y: '20%' } },
  { id: 'right-pocket', start: { x: '65%', y: '20%' }, end: { x: '66%', y: '20%' } }
]

export const SELECT_POSITIONS_BACK = [
  { id: 'back-pocket', start: { x: '67%', y: '23%' }, end: { x: '61%', y: '22%' } },
  { id: 'tramp', start: { x: '53%', y: '13%' }, end: { x: '50%', y: '14%' } },
  { id: 'right-heel', start: { x: '77%', y: '91%' }, end: { x: '66%', y: '90%' } },
  { id: 'left-heel', start: { x: '20%', y: '91%' }, end: { x: '33%', y: '90%' } }
]

export default function FredQuestionFour({ onComplete }: { onComplete: () => void }) {
  const [view, setView] = useState<'front' | 'back'>('front')
  const [selectedPatches, setSelectedPatches] = useState<Record<string, string>>({})
  const [activePopup, setActivePopup] = useState<string | null>(null)

  useEffect(() => {
    const hasSelection = Object.values(selectedPatches).some((val) => val)

    const handleUpdate = async () => {
      const session_id = localStorage.getItem('custom_session_id')
      if (!session_id) {
        console.error('No session ID found in localStorage')
        return
      }

      const { error } = await supabase
        .from('custom_orders')
        .update({
          patches: { selectedPatches },
        })
        .eq('session_id', session_id)

      if (error) {
        console.error('Failed to update custom order:', error)
        return
      }

      await IncrementStepCount()
      onComplete()
    }

    if (hasSelection) handleUpdate()
  }, [selectedPatches])

  const handleSelect = (id: string) => setActivePopup(id)

  const renderSelectors = (positions: typeof SELECT_POSITIONS_FRONT) => (
    <>
      {positions.map((pos) => (
        <div key={pos.id}>
          {/* Square Selector */}
          <div
            onClick={() => handleSelect(pos.id)}
            className="absolute w-10 h-10 bg-white border-2 border-black cursor-pointer flex items-center justify-center z-20"
            style={{
              top: pos.end.y,
              left: pos.end.x,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {selectedPatches[pos.id] ? (
              <Image
                src={selectedPatches[pos.id]}
                alt={pos.id}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : (
              <span className="text-xl font-bold text-black">+</span>
            )}
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      {/* Toggle View */}
      <div className="space-x-4">
        <button
          className={`px-4 py-1 rounded ${view === 'front' ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
          onClick={() => setView('front')}
        >
          Front
        </button>
        <button
          className={`px-4 py-1 rounded ${view === 'back' ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
          onClick={() => setView('back')}
        >
          Back
        </button>
      </div>

      {/* Image + Selectors */}
      <div className="relative w-full max-w-md aspect-[3/4]">
        <Image
          src={
            view === 'front'
              ? '/fred/silhouettes/white-silhouette-front.png'
              : '/fred/silhouettes/white-silhouette-back.png'
          }
          alt="Denim"
          fill
          className="object-contain"
        />
        {renderSelectors(view === 'front' ? SELECT_POSITIONS_FRONT : SELECT_POSITIONS_BACK)}

        {/* Popup Patch Menu */}
        {activePopup && (
          <div className="absolute z-30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow text-black">
            <h3 className="text-lg font-semibold mb-2">Select a patch for {activePopup}</h3>
            <div className="grid grid-cols-2 gap-3">
              {PATCH_OPTIONS.map((patch) => (
                <div
                  key={patch.label}
                  onClick={() => {
                    setSelectedPatches((prev) => ({ ...prev, [activePopup]: patch.image }))
                    setActivePopup(null)
                  }}
                  className="cursor-pointer hover:opacity-80"
                >
                  {patch.image ? (
                    <Image src={patch.image} alt={patch.label} width={60} height={60} />
                  ) : (
                    <div className="w-[60px] h-[60px] flex items-center justify-center bg-gray-200 text-sm">
                      None
                    </div>
                  )}
                  <p className="text-center text-xs mt-1">{patch.label}</p>
                </div>
              ))}
            </div>
            <button
              className="mt-4 px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
              onClick={() => setActivePopup(null)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
