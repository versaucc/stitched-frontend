// components/fred/FredGreeting.tsx
'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { IncrementStepCount } from './IncrementStepCount'

export default function FredGreeting({ name, onComplete }: { name: string, onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2500) // match typing or animation duration
    return () => clearTimeout(timer)
  }, [])

  IncrementStepCount()

  return (
    <div className="flex flex-col items-center space-y-4 mt-12">
    </div>
  )
}

