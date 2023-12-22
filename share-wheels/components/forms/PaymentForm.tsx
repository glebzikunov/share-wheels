"use client"

import { paymentStyle } from "@/constants"
import { updateRentalStatus } from "@/lib/actions/rental.actions"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { useRouter } from "next/navigation"
import React from "react"

interface Params {
  userId: string
  paymentInfo: {
    time: number
    totalAmount: number
  }
  userLocation: {
    lat: number
    lng: number
  }
}

function PaymentForm({ userId, paymentInfo, userLocation }: Params) {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const cardElement = elements?.getElement("card")

    try {
      if (!stripe || !cardElement) return null
      const { data } = await axios.post("/api/stripe", {
        data: { amount: paymentInfo.totalAmount },
      })
      const clientSecret = data

      const result = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      })

      if (result.paymentIntent?.status === "succeeded") {
        await updateRentalStatus(
          userId,
          paymentInfo.time,
          paymentInfo.totalAmount,
          userLocation.lat,
          userLocation.lng
        )

        router.push("/search")
      } else {
        alert(
          "Try again without page reloading so your ride time would not change!"
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="mt-10 rounded-xl bg-dark-2 p-7 text-light-1"
      onSubmit={onSubmit}
    >
      <CardElement
        className="text-white"
        options={{ style: { base: paymentStyle } }}
      />
      <button
        className="mt-10 rounded-3xl bg-primary-500 px-8 py-2 !text-small-regular text-light-1 max-xs:w-full !important"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}

export default PaymentForm
