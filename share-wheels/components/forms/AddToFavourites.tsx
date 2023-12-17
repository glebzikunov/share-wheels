"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import Image from "next/image"
import { addVehicleToFavourites } from "@/lib/actions/vehicle.actions"

interface Params {
  userId: string
  vehicleId: string
}

function AddToFavourites({ userId, vehicleId }: Params) {
  const router = useRouter()

  const handleClick = async () => {
    const addToFavourites = confirm("Add to favourites?")

    if (addToFavourites) {
      const result = await addVehicleToFavourites(userId, vehicleId)

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
      className="bg-red-500 vehicleAccount-card_btn self-start w-full max-sm:self-end"
    >
      <Image
        src="/assets/heart.svg"
        alt="Favourite icon"
        width={24}
        height={24}
      />
    </Button>
  )
}

export default AddToFavourites
