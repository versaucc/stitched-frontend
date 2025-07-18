'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function WaitlistInput({ onComplete }: { onComplete: () => void }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('email')
    if (stored) setEmail(stored)
  }, [])

  const handleSubmit = async () => {
    if (!email.trim()) return

    setStatus('submitting')
    localStorage.setItem('email', email.trim())

    const { error } = await supabase.from('emails').insert({ emails: email.trim() })

    if (error) {
      console.error('❌ Failed to insert email:', error)
      setStatus('error')
    } else {
      setStatus('submitted')
      onComplete?.()

      // Redirect to homepage after 4 seconds
      setTimeout(() => {
        router.push('/')
      }, 4000)
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm text-white block">
        Give us your email to join the waitlist!
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full px-3 py-2 rounded bg-white text-black"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        disabled={status === 'submitted'}
      >
        {status === 'submitted' ? '✅ Submitted!' : 'Join Waitlist'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-400 mt-1">Error submitting. Try again.</p>
      )}
    </div>
  )
}
