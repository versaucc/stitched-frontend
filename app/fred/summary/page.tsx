'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm' // <- We'll create this next

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)


export default function FredSummary() {
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [clientSecret, setClientSecret] = useState('')

  const markOrdered = async () => {

    const session_id = localStorage.getItem('custom_session_id')
    if (!session_id) {
      console.error('No session ID found in localStorage')
      return
    }
    await supabase 
      .from('custom_orders')
      .update({ordered : true})
      .eq('session_id', session_id)


  }


  useEffect(() => {
    const fetchData = async () => {
      const session_id = localStorage.getItem('custom_session_id')
      if (!session_id) {
        console.error('No session ID found in localStorage')
        return
      }

      const { data, error } = await supabase
        .from('custom_orders')
        .select('*')
        .eq('session_id', session_id)
        .single()

      if (error) {
        console.error('Failed to fetch custom order:', error)
        return
      } else {
        setOrder(data)
      }
    }

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: localStorage.getItem('custom_session_id') })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
  

    fetchData()
  }, [])

  if (!order) return <div className="text-white">Loading summary...</div>

  // Extract from JSON fields (with fallbacks)
  const q1 = order.question1_result || {}
  const q2 = order.question2_result || {}
  const q3 = order.question3_result || {}
  // Safely parse patches
  const patches = order.patches?.selectedPatches || {}

  const parsedPatches = Object.entries(patches).map(([position, path]) => {
    const fileName = path.split('/').pop() || 'unknown.png'
    return `${position}: ${fileName}`
  }).join(', ')

  const displayFields = [
    { label: 'Design Name', value: order.pair_name },
    { label: 'Silhouette', value: q1|| '—' },
    { label: 'Height', value: q2.height ? `${q2.height} in` : '—' },
    { label: 'Waist', value: q2.waist ? `${q2.waist} in` : '—' },
    { label: 'Inseam', value: q2.inseam ? `${q2.inseam} in` : '—' },
    { label: 'Thick Thighs', value: q2.thickThighs ? 'Yes' : 'No' },
    { label: 'Wash Type', value: q3.washType || '—' },
    { label: 'Color 1', value: q3.solidColor || q3.twoToneFront || '—' },
    { label: 'Color 2', value: q3.twoToneSide || '—' },
    { label: 'Patches', value: parsedPatches || 'None' },
    { label: 'Special Requests', value: order.special_requests || '—' },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-10 relative">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-[80%] space-y-4">
          {displayFields.map(({ label, value }) => (
            <div key={label} className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-semibold text-white">{label}:</span>
              <span className="text-gray-300 text-right">{value}</span>
            </div>
          ))}
        </div>
        {clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements> 
        )}
      </div>
    </div>
  )
}
