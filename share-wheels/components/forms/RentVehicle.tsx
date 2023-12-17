"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

function RentVehicle() {
  const router = useRouter()

  const handleClick = async () => {
    const rentingComfirmed = confirm("Are you sure to rent this vehicle?")

    if (rentingComfirmed) {
      // TODO: rent logic
      const result = {}
      console.log("Renting started")

      if (result?.error) {
        alert(result.error)
      } else {
        router.push("/")
      }
    }
  }

  return (
    <Button
      onClick={handleClick}
      size="sm"
      className="vehicleAccount-card_btn bg-primary-500 self-start max-sm:mt-5 max-sm:self-end"
    >
      Rent
    </Button>
  )
}

export default RentVehicle
