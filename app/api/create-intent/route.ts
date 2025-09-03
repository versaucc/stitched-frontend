import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20", // or latest available
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // IMPORTANT: compute/validate the amount on the server (do NOT trust client)
    // Example: look up items in DB and total them here.
    const { orderId } = body as { orderId: string };
    const amount = 2000; // $20.00 in cents — replace with your calculation

    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { orderId },
      // Optional: receipt_email: "customer@example.com",
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
