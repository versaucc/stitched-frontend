'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [redirect, setRedirect]  = useState('/home')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get('redirect') || '/shop';
    setRedirect(redirectParam);
  }, []);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !authData.user) {
    setError(error?.message || 'Login failed')
    return
  }


  const user = authData.user

  // Fetch existing login info
  const { data: profile } = await supabase
    .from('profiles')
    .select('logins, login_timestamps, ips_associated')
    .eq('id', user.id)
    .single()

  const now = new Date().toISOString()
  const ip = await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => data.ip)
    .catch(() => 'unknown')

  if (profile) {
    const updatedTimestamps = Array.isArray(profile.login_timestamps)
      ? [...profile.login_timestamps, now]
      : [now]

    const updatedIPs = Array.isArray(profile.ips_associated)
      ? [...new Set([...profile.ips_associated, ip])]
      : [ip]

    await supabase
      .from('profiles')
      .update({
        logins: (profile.logins || 0) + 1,
        login_timestamps: updatedTimestamps,
        ips_associated: updatedIPs,
      })
      .eq('id', user.id)
  }

  router.push(redirect)
}



  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-white text-black py-2 rounded hover:bg-gray-200">
          Sign In
        </button>
      </form>
    </div>
  )
}