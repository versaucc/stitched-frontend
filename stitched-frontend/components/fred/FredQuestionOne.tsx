'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IncrementStepCount } from './IncrementStepCount'
import { supabase } from '../../lib/supabase'

const options = [
  { id: 'SilhouetteOne', src: '/fred/silhouettes/silhouetteOne.jpg', alt: 'Silhouette One' },
  { id: 'SilhouetteTwo', src: '/fred/silhouettes/silhouetteTwo.jpg', alt: 'Silhouette Two' },
  { id: 'SilhouetteThree', src: '/fred/silhouettes/silhouetteThree.jpg', alt: 'Silhouette Three' },
]

export default function FredQuestionOne({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)


  useEffect(() => {
    if (!selected) return

    const handleUpdate = async () => {
      const session_id = localStorage.getItem('custom_session_id')
      if (!session_id) {
        console.error('No session ID found in localStorage')
        return
      }

      await IncrementStepCount()

      const { error } = await supabase
        .from('custom_orders')
        .update({ question1_result: selected })
        .eq('session_id', session_id)

      if (error) {
        console.error('Failed to update custom order:', error)
        return
      }

      onComplete()
    }

    handleUpdate()
  }, [selected])


  return (
    <div className="flex flex-col md:flex-col items-center justify-center gap-10 mt-8">

      {/* Options */}
      <div className="flex flex-col gap-6 mt-6 md:mt-0">
        {options.map(option => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`cursor-pointer border-4 rounded transition-all ${
              selected === option.id
                ? 'border-green-400 scale-105'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={option.src}
              alt={option.alt}
              className="w-48 h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
