"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "@/components/forms/PaymentForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

interface Params {
  userId: string
  paymentInfo: {
    time: number
    totalAmount: number
  }
}

function PaymentPage({ userId, paymentInfo }: Params) {
  return (
    <section>
      <h1 className="head-text">Pay</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm userId={userId} paymentInfo={paymentInfo} />
      </Elements>
    </section>
  )
}

export default PaymentPage
