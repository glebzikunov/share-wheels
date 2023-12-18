"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { addRental } from "@/lib/actions/rental.actions"

interface Params {
  rentingVehicle: string
  rentalId: string
}

function RentVehicle({ rentingVehicle, rentalId }: Params) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = async () => {
    const rentingComfirmed = confirm("Are you sure to rent this vehicle?")

    if (rentingComfirmed) {
      const result = await addRental({
        vehicleId: rentingVehicle,
        rentalId: rentalId,
        path: pathname,
      })

      if (result?.error) {
        alert(result.error)
      } else {
        router.push("/search")
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
