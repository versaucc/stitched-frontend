'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'


export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
 
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [redirect, setRedirect] = useState('/home')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    
    await supabase.from('profiles').insert([
      {
        name,
        phone,
        email: email, 
      },
    ])

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {

      // store extra profile info in a separate table
      const { data: { user } } = await supabase.auth.getUser()

      setMessage('Check your email to verify your account.')

      if(redirect) {
          await new Promise(resolve => setTimeout(resolve, 3000)) // 1 second delay
          router.push(redirect)
      } 
    }
  }
    useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('redirect')
    setRedirect(param || '/home')
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
      <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
          required
        />
        <input
          type="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <button type="submit" className="w-full bg-white text-black py-2 rounded hover:bg-gray-200">
          Sign Up
        </button>
      </form>
    </div>
  )
}
