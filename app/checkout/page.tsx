"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Call your API to create a PaymentIntent for THIS order
    (async () => {
      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: "abc123" }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    })();
  }, []);

  if (!clientSecret) return <div className="p-6">Preparing checkout…</div>;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: { theme: "stripe" },
        // Optionally set locale, fonts, etc.
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage(null);

    // Confirm the payment. Use `redirect: "if_required"` to stay on-page
    // unless 3DS/authentication is needed.
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: typeof window !== "undefined" ? window.location.origin + "/checkout/complete" : "",
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message ?? "Something went wrong.");
    } else {
      // If no redirect was required, the PaymentIntent is succeeded or requires more steps.
      // You can poll or fetch payment status from your server here if desired.
      setMessage("Payment processed! Check your email for a receipt.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 border rounded-xl">
      <PaymentElement />
      <button
        disabled={!stripe || isLoading}
        className="w-full rounded-lg border px-4 py-2 font-medium disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Pay now"}
      </button>
      {message && <div className="text-sm text-red-600">{message}</div>}
      <p className="text-xs text-gray-500">
        Payments are securely processed by Stripe. You won’t leave this page unless authentication is required.
      </p>
    </form>
  );
}
