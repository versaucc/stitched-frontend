'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!error) {
        setProfile(profile)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [])

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Account</h1>
      <div className="w-full max-w-xl space-y-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {profile?.name || '—'}</p>
        <p><strong>Phone:</strong> {profile?.phone || '—'}</p>
        <p><strong>Instagram:</strong> {profile?.instagram || '—'}</p>
        <p><strong>Preferred Contact:</strong> {profile?.contact || '—'}</p>
        <p><strong>Age:</strong> {profile?.age || '—'}</p>
        <p><strong>Gender:</strong> {profile?.gender || '—'}</p>
        <p><strong>Notes:</strong> {profile?.notes || '—'}</p>
      </div>
    </div>
  )
}
