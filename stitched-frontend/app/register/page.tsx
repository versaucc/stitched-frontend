'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [contact, setContact] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      // store extra profile info in a separate table
      const user = data.user
      if (user) {
        await supabase.from('profiles').insert([
          {
            id: user.id,
            name,
            phone,
            instagram,
            contact,
            age: age ? Number(age) : null,
            gender,
            notes,
          },
        ])
      }
      setMessage('Check your email to verify your account.')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
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
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Instagram (optional)"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Preferred contact method (optional)"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
        />
        <input
          type="number"
          placeholder="Age (optional)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Gender (optional)"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
        />
        <textarea
          placeholder="Any account notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
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
