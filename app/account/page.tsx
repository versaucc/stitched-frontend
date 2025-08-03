'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/account/login')
        return
      }

      setUser(user)

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('UID', user.id)
        .single()

      if (!error && profile) {
        setProfile(profile)
        setName(profile.name || '')
        setPhone(profile.phone || '')
        setInstagram(profile.instagram || '')
        setContact(profile.contact || '')
        setGender(profile.gender || '')
        setNotes(profile.notes || '')
      }

      setLoading(false)
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleSave = async () => {
    if (!profile) return
    setUpdating(true)

    const { error } = await supabase
      .from('profiles')
      .update({
        name,
        phone,
        instagram,
        contact,
        gender,
        notes
      })
      .eq('UID', profile.UID)

    setUpdating(false)

    if (!error) {
      alert('Profile updated successfully.')
    } else {
      alert('Failed to update profile.')
    }
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-8 relative">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-black z-50 shadow-md border-b border-gray-700">
        <div className="max-w-6xl mx-auto flex justify-start gap-6 px-6 py-4">
          <button onClick={() => router.push('/')} className="hover:text-gray-300 font-semibold">Home</button>
          <button onClick={() => router.push('/account/orders')} className="hover:text-gray-300 font-semibold">Orders</button>
          <button onClick={() => router.push('/account/customs')} className="hover:text-gray-300 font-semibold">Customs</button>
          <button onClick={() => router.push('/account')} className="hover:text-green-400 font-semibold">Account</button>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-20" />

      {/* Account Info */}
      <h1 className="text-3xl font-bold mb-6">Your Account</h1>
      <div className="w-full max-w-xl space-y-4">
        <p><strong>Email:</strong> {user.email}</p>

        <div>
          <label>Name:</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 p-2 text-black rounded" />
        </div>

        <div>
          <label>Phone:</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full mt-1 p-2 text-black rounded" />
        </div>

        <div>
          <label>Instagram:</label>
          <input value={instagram} onChange={e => setInstagram(e.target.value)} className="w-full mt-1 p-2 text-black rounded" />
        </div>

        <div>
          <label>Preferred Contact:</label>
          <input value={contact} onChange={e => setContact(e.target.value)} className="w-full mt-1 p-2 text-black rounded" />
        </div>

        <div>
          <label>Gender:</label>
          <select value={gender} onChange={e => setGender(e.target.value)} className="w-full mt-1 p-2 text-black rounded">
            <option value="">—</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Nonbinary">Nonbinary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Notes:</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full mt-1 p-2 text-black rounded h-24" />
        </div>

        <button
          onClick={handleSave}
          disabled={updating}
          className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200"
        >
          {updating ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed bottom-6 right-6 bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 shadow"
      >
        Log Out
      </button>
    </div>
  )
}
