'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import FredGreeting from '../../components/fred/FredGreeting'
import FredCombinedCustomizer from '../../components/fred/FredCombinedCustomizer' // This is the new merged step
import FredQuestionFour from '../../components/fred/FredQuestionFour'
import FredQuestionFive from '../../components/fred/FredQuestionFive'
import FredContainer from '../../components/fred/FredContainer'

const stepLabels = ['Fit & Wash', 'Patches', 'Final Notes']

export default function FredDemoPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [showGreeting, setShowGreeting] = useState(true)

  useEffect(() => {
    const createSession = async () => {
      const { data, error } = await supabase.from('custom_orders').insert({
        step_ct: 0,
        saved: false,
        ordered: false
      }).select().single()

      if (data && data.session_id) {
        localStorage.setItem('custom_session_id', data.session_id)
        setSessionId(data.session_id)
        const initialSteps = [false, false, false]
        localStorage.setItem('completed_steps', JSON.stringify(initialSteps))
        setCompletedSteps(initialSteps)
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
      await supabase.from('custom_orders').update({
        step_ct: index
      }).eq('session_id', sessionId)
    }

    // Proceed to next step
    if (index < stepLabels.length - 1) {
      setStepIndex(index + 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar menu */}
      <aside className="w-48 bg-gray-800 p-4 space-y-4">
        {stepLabels.map((label, i) => (
          <button
            key={i}
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${
              stepIndex === i ? 'bg-gray-700 font-bold' : ''
            }`}
            disabled={i > 0 && !completedSteps[i - 1]}
            onClick={() => setStepIndex(i)}
          >
            {label} {completedSteps[i] && '✅'}
          </button>
        ))}
      </aside>

      {/* Fred and Question Display */}
      <main className="flex-1 flex flex-row items-center justify-center p-6 relative">
        <div className="relative flex flex-col items-center justify-center mr-10">
        <FredContainer
          message={stepLabels[stepIndex]}
          flagA={false}
          flagB={false}
          className="absolute -top-24 left-1/2 transform -translate-x-1/2"
        >
          {/* If you don’t want to show anything inside, pass an empty fragment */}
          <></>
        </FredContainer>

        </div>

        <div className="flex-1 p-6 max-w-2xl">
          {showGreeting ? (
            <FredGreeting
              name="friend"
              onComplete={() => {
                setShowGreeting(false)
                setStepIndex(0)
              }}
            />
          ) : (
            <>
              {stepIndex === 0 && <FredCombinedCustomizer onComplete={() => updateCompletion(0)} />}
              {stepIndex === 1 && <FredQuestionFour onComplete={() => updateCompletion(1)} />}
              {stepIndex === 2 && <FredQuestionFive onSubmit={() => updateCompletion(2)} />}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
