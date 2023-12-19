"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { deleteVehicleFromFavourites } from "@/lib/actions/vehicle.actions"

interface Params {
  userId: string
  vehicleId: string
}

function DeleteFavourite({ userId, vehicleId }: Params) {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = async () => {
    const deleteFavourite = confirm("Delete from favourites?")

    if (deleteFavourite) {
      const result = await deleteVehicleFromFavourites(
        userId,
        vehicleId,
        pathname
      )

      if (result?.error) {
        alert(result.error)
      }
    }
  }

  return (
    <Button
      onClick={handleClick}
      size="sm"
      className="bg-red-500 vehicleAccount-card_btn self-start max-sm:self-end"
    >
      Delete
    </Button>
  )
}

export default DeleteFavourite
