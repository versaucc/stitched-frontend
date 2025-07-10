'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function CustomSuiteForm({ user, profile }: { user: any, profile: any }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    preferred_contact: '',
    age: '',
    gender: '',
    comment: '',
  })

  const [status, setStatus] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (profile) {
      setForm(prev => ({
        ...prev,
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        instagram: profile.instagram || '',
      }))
    }
  }, [profile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Submitting...')

    const { error } = await supabase.from('custom_orders').insert([
      {
        user_id: user?.id || null,
        name: form.name,
        email: form.email,
        phone: form.phone,
        instagram: form.instagram,
        preferred_contact: form.preferred_contact,
        age: form.age ? Number(form.age) : null,
        gender: form.gender,
        comment: form.comment,
      }
    ])

    if (error) {
      console.error(error)
      setStatus('Submission failed ❌')
    } else {
      setStatus('Submitted ✔️')
      setTimeout(() => {
        setSubmitted(true)
      }, 2000)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-6 mt-12">
        <div className="text-green-400 text-6xl">✔</div>
        <h2 className="text-2xl font-bold">Thank you for submitting your custom suite!</h2>
        <button
          onClick={() => router.push('/fred')}
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
        >
          Customize with Fred
        </button>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl w-full text-black">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name *"
        required
        className="p-2 bg-white rounded w-full"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email *"
        required
        className="p-2 bg-white rounded w-full"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone *"
        required
        className="p-2 bg-white rounded w-full"
      />
      <input
        name="instagram"
        value={form.instagram}
        onChange={handleChange}
        placeholder="Instagram (optional)"
        className="p-2 bg-white rounded w-full"
      />
      <input
        name="preferred_contact"
        value={form.preferred_contact}
        onChange={handleChange}
        placeholder="Preferred contact method (optional)"
        className="p-2 bg-white rounded w-full"
      />
      <input
        name="age"
        value={form.age}
        onChange={handleChange}
        placeholder="Age (optional)"
        className="p-2 bg-white rounded w-full"
        type="number"
      />
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="p-2 bg-white rounded w-full"
      >
        <option value="">Gender (optional)</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="nonbinary">Non-binary</option>
        <option value="prefer-not">Prefer not to say</option>
      </select>
      <textarea
        name="comment"
        value={form.comment}
        onChange={handleChange}
        placeholder="Additional comment"
        className="p-2 bg-white rounded h-32 w-full"
      />
      <div className="flex justify-between items-center">
        <span className="text-sm text-green-400">{status}</span>
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          Submit to Stitched
        </button>
      </div>
    </form>
  )
}

