'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function FredStart({ onComplete }: { onComplete: () => void }) {
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'creating' | 'done' | 'error'>('idle')

  const handleStart = async () => {
    if (!name.trim()) return
    setStatus('creating')

    const UID = '92b7e17d-ad61-4ec2-89f6-b6347db40c5e' // fixed UID you provided

    const { data, error } = await supabase.from('custom_orders').insert({
      name: name.trim(),
      step_ct: 0,
      saved: false,
      ordered: false,
      UID
    }).select().single()

    if (error || !data?.session_id) {
      console.error('❌ Failed to create custom order row:', error)
      setStatus('error')
      return
    }

    localStorage.setItem('custom_session_id', data.session_id)
    setStatus('done')
    onComplete()
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <label htmlFor="name" className="text-sm text-white">
        First, what's your name?
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="px-3 py-2 rounded bg-white text-black w-64"
      />
    </div>
  )
}
