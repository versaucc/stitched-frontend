import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
})

export async function POST(req: Request) {
  const { session_id } = await req.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000, // Replace with actual price
    currency: 'usd',
    metadata: { session_id }
  })

  return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}
