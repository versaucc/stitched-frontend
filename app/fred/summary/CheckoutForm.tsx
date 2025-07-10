'use client'

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/fred/success`
      }
    })

    if (error) setErrorMessage(error.message || 'Payment failed.')
    setLoading(false)
  }

return (
  <div className="w-full flex justify-end ">
    <form
      onSubmit={handleSubmit}
      className="w-auto sticky top-10 space-y-4 bg-white text-black p-6 rounded shadow"
    >
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {loading ? 'Processing...' : 'Submit Payment'}
      </button>
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
    </form>
  </div>
)

}
