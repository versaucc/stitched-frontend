'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

import FredLoadPair from '../../components/fred/FredLoadPair'
import FredCombinedCustomizer from '../../components/fred/FredCombinedCustomizer'
import FredQuestionFour from '../../components/fred/FredQuestionFour'
import FredQuestionFive from '../../components/fred/FredQuestionFive'
import FredContainer from '../../components/fred/FredContainer'

import { getStoredSession, setStoredSession } from '../../lib/sessionManager'
import { CustomPairSession } from '../../types/customPairSession'

const stepLabels = [
  'Start a new pair!',
  'Pick your style!',
  'Everyone loves some embroidered denim',
  'Anything else?'
]

export default function FredDemoPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const router = useRouter()

useEffect(() => {
  const initOrRestoreSession = async () => {
    // Check if a session is already in localStorage
    const existing = getStoredSession()
    if (existing?.session_id) {
      setSessionId(existing.session_id)
      setCompletedSteps((prev) => {
        const completed = [...prev]
        for (let i = 0; i <= existing.step_ct; i++) completed[i] = true
        return completed
      })
      return
    }

    // Otherwise create a new custom order
    const { data: newOrder } = await supabase.from('custom_orders').insert({
      step_ct: 0,
      saved: false,
      ordered: false
    }).select().single()

    if (newOrder?.session_id) {
      const sessionObj: CustomPairSession = {
        session_id: newOrder.session_id,
        user_id: newOrder.user_id,
        step_ct: 0,
        saved: false,
        ordered: false
      }

      setStoredSession(sessionObj)
      setSessionId(newOrder.session_id)

      // Update profile with active session
      const { data: user } = await supabase.auth.getUser()
      if (user?.user?.id) {
        await supabase
          .from('profiles')
          .update({ custom_session_id: newOrder.session_id })
          .eq('UID', user.user.id)
      }
    }
  }

  initOrRestoreSession()
}, [])


  const updateCompletion = async (index: number) => {
    const updatedSteps = [...completedSteps]
    updatedSteps[index] = true
    setCompletedSteps(updatedSteps)
    localStorage.setItem('completed_steps', JSON.stringify(updatedSteps))

    if (sessionId) {
      await supabase
        .from('custom_orders')
        .update({ step_ct: index })
        .eq('session_id', sessionId)
    }

    // Clear session on final step
    if (index === stepLabels.length - 1) {
      localStorage.removeItem('custom_session_id')
    }
  }

  const handleNext = () => {
    setStepIndex((prev) => Math.min(prev + 1, stepLabels.length - 1))
  }

  const handlePrev = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-transparent p-4 flex justify-between items-center">
        <button
          className="text-white text-2xl px-4 py-2 hover:opacity-80"
          onClick={handlePrev}
        >
          ←
        </button>
        <button
          className="text-white text-2xl px-4 py-2 hover:opacity-80"
          onClick={handleNext}
        >
          →
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-row items-center justify-center p-8 relative">
        <div className="relative flex flex-col items-center justify-center mr-20">
          <FredContainer
            message={stepLabels[stepIndex]}
            flagA={false}
            flagB={false}
            className="absolute-top-24 left-1/2 transform -translate-x-1/2"
          >
            <></>
          </FredContainer>
        </div>

        <div className="flex-1 p-8 max-w-2xl">
          <>
            {stepIndex === 0 && (
              <FredLoadPair
                onComplete={() => {
                  updateCompletion(0)
                  handleNext()
                }}
              />
            )}
            {stepIndex === 1 && <FredCombinedCustomizer onComplete={() => updateCompletion(1)} />}
            {stepIndex === 2 && <FredQuestionFour onComplete={() => updateCompletion(2)} />}
            {stepIndex === 3 && (
              <FredQuestionFive
                onSubmit={() => {
                  updateCompletion(3)
                  router.push('/fred/summary')
                }}
              />
            )}
          </>
        </div>
      </main>
    </div>
  )
}

