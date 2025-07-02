'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabase'
import CustomSuiteForm from '../../../../components/CustomSuiteForm'
import MinimalNavbar from '../../../../components/MinimalNavbar'
import MatrixRain from '../../../../components/matrix-rain-enhanced'

export default function CustomSuitePage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setUser(user)
      setProfile(profileData)
      setLoading(false)
    }

    load()
  }, [])

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Top Navbar */}
      <MinimalNavbar />

      {/* MatrixRain Left */}
      <div className="absolute top-0 left-0 h-full z-0 pointer-events-none" style={{ width: '15%' }}>
        <MatrixRain />
      </div>

      {/* MatrixRain Right */}
      <div className="absolute top-0 right-0 h-full z-0 pointer-events-none" style={{ width: '15%' }}>
        <MatrixRain />
      </div>

      {/* Centered Form */}
      <div className="relative z-10 flex justify-center items-center pt-32 px-4">
        <div className="w-full max-w-2xl">
          <CustomSuiteForm user={user} profile={profile} />
        </div>
      </div>
    </div>
  )
}


