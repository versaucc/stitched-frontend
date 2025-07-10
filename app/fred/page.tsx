'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { IncrementStepCount } from '../../components/fred/IncrementStepCount'

// Walkthrough path 
import FredLandingPage from '../../components/fred/FredLandingPage'
import FredLoadPair from '../../components/fred/FredLoadPair'
import FredGreeting from '../../components/fred/FredGreeting'
import FredQuestionOne from '../../components/fred/FredQuestionOne'
import FredQuestionTwo from '../../components/fred/FredQuestionTwo'
import FredQuestionThree from '../../components/fred/FredQuestionThree'
import FredQuestionFour from '../../components/fred/FredQuestionFour'
import FredQuestionFive from '../../components/fred/FredQuestionFive'

// Containers
import FredMannequin from '../../components/fred/FredMannequin'
import FredContainer from '../../components/fred/FredContainer'


export default function FredPage() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [mannequinSettings, setMannequinSettings] = useState({
    height: 66,
    waist: 30,
    thickThighs: false,
  })


const router = useRouter()

// Logic to resume session   
const [stepIndex, setStepIndex] = useState(0)
const [canProceed, setCanProceed] = useState(false)
const [pairLoaded, setPairLoaded] = useState(false)

// Step messages
const stepMessages = [
  null, // Step 0 is FredLoadPair, no message needed
  `Hey ${profile?.name || 'friend'}! I'm Fred. I'm going to be helping you design yourself a pair of custom jeans. If you have any questions let me know!`,
  "We offer 3 silhouettes : baggy, real baggy, and parachute. You'll choose an inseam size later - this will decide the overall shape of the denim.",
  "Now for the specs, your height will help us decide how to tailor the length, but the waist and inseam are up to you!",
  "Now let’s pick the wash of the jeans — you can pick a classic denim wash or we can source you some custom colors of your choice!",
  "Embroideries? These are a must when styling your own jeans. You can pick from our classic 'stitched' designs, browse other patches, or for a couple extra bucks — upload your own design to put on your pair!",
  "Finally your own design! Take a look at the specs and let us know if you have any other requests."
]

// FredContainer flags
const flagAStates = [false, false, false, false, false, false, false]
const flagBStates = [false, false, false, false, false, false, false]


useEffect(() => {
  const restoreSession = async () => {
    const sessionId = localStorage.getItem('custom_session_id')
    if (!sessionId) return

    const { data: order } = await supabase
      .from('custom_orders')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (order) {
      setPairLoaded(true)
      // Optional: set other pieces of restored state
      setStepIndex(order.step_ct || 0) // Add this to schema if desired
      setCanProceed(true)
    }
  }

  restoreSession()
}, [])


  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
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


// Steps logic - Very important. Breaking changes are likely
const steps = useMemo(() => [
  <FredLoadPair onComplete={() => {
    setPairLoaded(true)
    setCanProceed(true)
    handleNext()
  }} />,
  <FredGreeting name={profile?.name || 'friend'} onComplete={() => setCanProceed(true)} />,
  <FredQuestionOne onComplete={() => setCanProceed(true)} />,
  <FredQuestionTwo onComplete={() => setCanProceed(true)} setMannequinSettings={setMannequinSettings} />,
  <FredQuestionThree onComplete={() => setCanProceed(true)} />,
  <FredQuestionFour onComplete={() => setCanProceed(true)} />,
  <FredQuestionFive onSubmit={(note, files) => {
    console.log('Final notes:', note)
    console.log('Files submitted:', files)
    setCanProceed(true)
  }} />
], [profile, pairLoaded])




  const handleNext = async () => {
    if (!canProceed || (stepIndex > 1 && !pairLoaded)) return
    setCanProceed(false)

    const nextStep = Math.min(stepIndex + 1, steps.length - 1)

    setStepIndex(nextStep)

    const orderId = localStorage.getItem('current_order_id')
    if (orderId) {
      await supabase.from('custom_orders').update({
        step_ct: nextStep
      }).eq('id', orderId)
    }

  } 
  const handleBack = async () => {
  if (stepIndex === 0) return

  if (stepIndex === 0 && canProceed && pairLoaded) setStepIndex(1)

  setStepIndex((prev) => Math.max(prev - 1, 0))

  // Optional: persist step index back to Supabase
  const orderId = localStorage.getItem('current_order_id')
  if (orderId) {
    await supabase.from('custom_orders').update({
      step_index: stepIndex - 1
    }).eq('id', orderId)
  }
}


  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {/* Offset floating "Back" button */}
    {stepIndex > 0 && (
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 px-4 py-2 rounded text-black bg-white hover:bg-gray-200 font-semibold"
      >
        ← Back
      </button>
    )}
      {/* Offset floating "Next" button */}
    {stepIndex > 0 && (
      <button
        onClick={handleNext}
        disabled={!canProceed}
        className={`fixed top-6 right-6 px-4 py-2 rounded text-black font-semibold
          ${canProceed ? 'bg-white hover:bg-gray-200' : 'bg-gray-600 cursor-not-allowed'}
        `}
      >
        Next →
      </button> )}
      {stepIndex >= 2 && stepIndex < steps.length - 1}
      <div className="w-full max-w-5xl flex flex-col md:flex-row relative">
        <div className="flex-1">
          {stepIndex === 0 && steps[0]} {/* FredLoadPair renders solo */}

          {stepIndex > 0 && stepIndex < steps.length && (
            <FredContainer
              message={stepMessages[stepIndex] || ''}
              flagA={flagAStates[stepIndex]}
              flagB={flagBStates[stepIndex]}
            >
              {steps[stepIndex]}
            </FredContainer>
          )}
        </div>
      </div>

  </div>
  )
}
