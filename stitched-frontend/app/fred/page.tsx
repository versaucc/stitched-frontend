'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

// Walkthrough path 
import FredGreeting from '../../components/fred/FredGreeting'
import FredBasicInfo from '../../components/fred/FredBasicInfo'
import FredQuestionOne from '../../components/fred/FredQuestionOne'
import FredQuestionTwo from '../../components/fred/FredQuestionTwo'

// Containers
import FredMannequin from '../../components/fred/FredMannequin'


export default function FredPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [canProceed, setCanProceed] = useState(false)
  const [measurements, setMeasurements] = useState({ height: 0, waist: 0, thickThighs: false})

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

  // Define ordered walkthrough steps
const steps = useMemo(() => [
  <FredGreeting name={profile?.name || 'friend'} onComplete={() => setCanProceed(true)} />,
  <FredBasicInfo onComplete={() => setCanProceed(true)} />,
  <FredQuestionOne onComplete={() => setCanProceed(true)} />,
  <FredQuestionTwo
    onComplete={() => setCanProceed(true)}
    onUpdate={(data) => setMeasurements(data)}
  />
], [profile])

  const handleNext = () => {
    if (!canProceed) return
    setCanProceed(false)
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {/* Offset floating "Next" button */}
      <button
        onClick={handleNext}
        disabled={!canProceed}
        className={`fixed top-6 right-6 px-4 py-2 rounded text-black font-semibold
          ${canProceed ? 'bg-white hover:bg-gray-200' : 'bg-gray-600 cursor-not-allowed'}
        `}
      >
        Next →
      </button>
      {stepIndex === 3 && (
        <FredMannequin height={measurements.height} waist={measurements.waist} />
      )}
      {/* Current walkthrough step */}
      <div className="w-full max-w-3xl">
        {steps[stepIndex]}
      </div>
    </div>
  )
}
