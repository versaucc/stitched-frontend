'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function FredLandingPage({ onComplete }: { onComplete: () => void }) {

  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setChecking(false)
        onComplete()
      } 
    }
    checkAuth()
  }, [router])

  return (
    <div className="text-white text-center mt-20 column">
      {checking ? 'Checking login...' : '' }
    </div>
  )
}
