'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '../../lib/supabase'
import FredGreeting from '../../components/fred/FredGreeting'
import FredQuestionOne from '../../components/fred/FredQuestionOne'
import FredQuestionTwo from '../../components/fred/FredQuestionTwo'
import FredQuestionThree from '../../components/fred/FredQuestionThree'
import FredQuestionFour from '../../components/fred/FredQuestionFour'
import FredQuestionFive from '../../components/fred/FredQuestionFive'
import FredContainer from '../../components/fred/FredContainer'

const stepComponents = [
  FredGreeting,
  FredQuestionOne,
  FredQuestionTwo,
  FredQuestionThree,
  FredQuestionFour,
  FredQuestionFive,
]

const stepLabels = [
  'Greeting',
  'Silhouette',
  'Measurements',
  'Wash',
  'Patches',
  'Final Notes'
]

export default function FredDemoPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, false, false])
  const [sessionId, setSessionId] = useState<string | null>(null)

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
        localStorage.setItem('completed_steps', JSON.stringify([true, false, false, false, false, false]))
        setCompletedSteps([true, false, false, false, false, false])
      }
    }
    createSession()
  }, [])

  const updateCompletion = async (index: number) => {
    const newCompleted = [...completedSteps]
    newCompleted[index] = true
    localStorage.setItem('completed_steps', JSON.stringify(newCompleted))
    setCompletedSteps(newCompleted)

    if (sessionId) {
      await supabase.from('custom_orders').update({
        step_ct: index
      }).eq('session_id', sessionId)
    }
  }


  return (
    <div className="min-h-screen bg-black text-white flex">
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

      <main className="flex-1 flex justify-center items-center p-6">
        <FredContainer
          message={stepLabels[stepIndex]}
          flagA={false}
          flagB={false}
        >
          {stepIndex === 0 && (
            <FredGreeting name="friend" onComplete={() => updateCompletion(0)} />
          )}
          {stepIndex === 1 && (
            <FredQuestionOne onComplete={() => updateCompletion(1)} />
          )}
          {stepIndex === 2 && (
            <FredQuestionTwo
              onComplete={() => updateCompletion(2)}
              setMannequinSettings={() => {}}
            />
          )}
          {stepIndex === 3 && (
            <FredQuestionThree onComplete={() => updateCompletion(3)} />
          )}
          {stepIndex === 4 && (
            <FredQuestionFour onComplete={() => updateCompletion(4)} />
          )}
          {stepIndex === 5 && (
            <FredQuestionFive onSubmit={() => updateCompletion(5)} />
          )}
        </FredContainer>
      </main>
    </div>
  )

}

