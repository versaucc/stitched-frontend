'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import FredGreeting from '../../components/fred/FredGreeting'
import FredStart from '../../components/fred/FredStart'
import FredCombinedCustomizer from '../../components/fred/FredCombinedCustomizer'
import FredQuestionFour from '../../components/fred/FredQuestionFour'
import FredQuestionFive from '../../components/fred/FredQuestionFive'
import FredContainer from '../../components/fred/FredContainer'
import WaitlistInput from '../../components/fred/WaitlistInput'

const stepLabels = ['Start', 'Fit & Wash', 'Patches', 'Notes', 'Waitlist']

export default function FredDemoPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [showGreeting, setShowGreeting] = useState(true)

  useEffect(() => {
    const createSession = async () => {
      const { data } = await supabase.from('custom_orders').insert({
        step_ct: 0,
        saved: false,
        ordered: false
      }).select().single()

      if (data?.session_id) {
        localStorage.setItem('custom_session_id', data.session_id)
        setSessionId(data.session_id)
        setCompletedSteps([false, false, false, false])
      }
    }
    createSession()
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

return (
  <div className="min-h-screen bg-black text-white flex flex-col">
    {/* Top Navbar */}
    <nav className="sticky top-0 z-50 bg-gray-800 p-4 flex space-x-4 justify-center">
      {stepLabels.map((label, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded hover:bg-gray-700 ${
            stepIndex === i ? 'bg-white text-black font-bold' : 'bg-gray-800 text-white'
          }`}
          onClick={() => setStepIndex(i)}
        >
          {label} {completedSteps[i] && '✅'}
        </button>
      ))}
    </nav>

    {/* Main content */}
    <main className="flex-1 flex flex-row items-center justify-center p-6 relative">
      <div className="relative flex flex-col items-center justify-center mr-10">
        <FredContainer
          message={stepLabels[stepIndex]}
          flagA={false}
          flagB={false}
          className="absolute -top-24 left-1/2 transform -translate-x-1/2"
        >
          <></>
        </FredContainer>
      </div>

      <div className="flex-1 p-6 max-w-2xl">
        <>
          {stepIndex === 0 && <FredStart onComplete={() => updateCompletion(0)} />}
          {stepIndex === 1 && <FredCombinedCustomizer onComplete={() => updateCompletion(1)} />}
          {stepIndex === 2 && <FredQuestionFour onComplete={() => updateCompletion(2)} />}
          {stepIndex === 3 && <FredQuestionFive onSubmit={() => updateCompletion(3)} />}
          {stepIndex === 4 && <WaitlistInput onComplete={() => updateCompletion(4)} />}
        </>
      </div>
    </main>
  </div>
)

}
