'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function WaitlistInput({ onComplete }: { onComplete: () => void }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')

  useEffect(() => {
    const stored = localStorage.getItem('waitlist_email')
    if (stored) setEmail(stored)
  }, [])

  const handleSubmit = async () => {
    setStatus('submitting')
    localStorage.setItem('waitlist_email', email)

    const { error } = await supabase.from('waitlist').insert({ email })

    if (error) {
      console.error('❌ Failed to insert waitlist email:', error)
      setStatus('error')
    } else {
      setStatus('submitted')
      onComplete() // ✅ tell parent walkthrough to mark this step complete and clear session
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor="waitlist-email" className="text-sm text-white block">
        Give us your email to join the waitlist!
      </label>
      <input
        id="waitlist-email"
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
