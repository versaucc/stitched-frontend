'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function FredStart({
  onComplete,
}: {
  onComplete: (sessionId: string) => void
}) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStart = async () => {
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }

    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('custom_orders')
      .insert({ user_name: name, step_ct: 0, saved: false, ordered: false })
      .select()
      .single()

    setLoading(false)

    if (error || !data?.session_id) {
      setError('Failed to start session.')
      return
    }

    localStorage.setItem('custom_session_id', data.session_id)
    onComplete(data.session_id)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-8">
      <label htmlFor="userName" className="text-white text-lg font-semibold">
        Enter your name to begin customizing:
      </label>
      <input
        id="userName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 rounded border border-white bg-black text-white w-64"
        placeholder="Your name"
      />
      <button
        onClick={handleStart}
        disabled={loading}
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 disabled:opacity-50"
      >
        {loading ? 'Starting...' : 'Start Custom Pair'}
      </button>
      {error && <p className="text-red-400">{error}</p>}
    </div>
  )
}
