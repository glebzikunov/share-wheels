"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

function PayForRent() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/pay-for-rent")
  }

  return (
    <Button
      onClick={handleClick}
      size="sm"
      className="vehicleAccount-card_btn bg-primary-500 self-start max-sm:mt-5 max-sm:self-end"
    >
      Pay
    </Button>
  )
}

export default PayForRent
