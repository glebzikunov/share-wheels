"use server"

import { revalidatePath } from "next/cache"
import Rental from "../models/rental.model"
import User from "../models/user.model"
import { connectToDb } from "../mongoose"
import Vehicle from "../models/vehicle.model"

interface Params {
  vehicleId: string
  rentalId: string
  path: string
}

export async function addRental({ vehicleId, rentalId, path }: Params) {
  try {
    connectToDb()

    const user = await User.findById(rentalId)
    if (user && user.rentals && user.rentals.length === 0) {
      const createdRental = await Rental.create({
        rental: rentalId,
        vehicle: vehicleId,
        type: "Active",
      })

      await User.findByIdAndUpdate(rentalId, {
        $push: { rentals: createdRental._id },
      })

      await Vehicle.findByIdAndUpdate(vehicleId, {
        $set: { isFree: false },
      })
    } else {
      throw new Error("End active rent!")
    }

    revalidatePath(path)
  } catch (error: any) {
    return {
      error: `Error starting rental: ${error.message}`,
    }
  }
}
