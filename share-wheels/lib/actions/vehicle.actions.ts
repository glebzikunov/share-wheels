"use server"

import { revalidatePath } from "next/cache"
import { connectToDb } from "../mongoose"
import User from "../models/user.model"
import Vehicle from "../models/vehicle.model"

interface Params {
  mark: string
  model: string
  vehicleNumber: string
  rentalAmount: number
  image: string
  isAvailable: string
  description: string
  ownerId: string
  path: string
}

export async function addVehicle({
  mark,
  model,
  vehicleNumber,
  rentalAmount,
  image,
  isAvailable,
  description,
  ownerId,
  path,
}: Params) {
  try {
    connectToDb()

    let isAvailableForRenting: boolean
    if (isAvailable === "true") {
      isAvailableForRenting = true
    } else {
      isAvailableForRenting = false
    }

    const createdVehicle = await Vehicle.create({
      mark: mark,
      model: model,
      number: vehicleNumber,
      rentalAmount: rentalAmount,
      image: image,
      description: description,
      isAvailable: isAvailableForRenting,
      owner: ownerId,
    })

    await User.findByIdAndUpdate(ownerId, {
      $push: { vehicles: createdVehicle._id },
    })

    revalidatePath(path)
  } catch (error: any) {
    return {
      error: `Error adding vahicle: ${error.message}`,
    }
  }
}
