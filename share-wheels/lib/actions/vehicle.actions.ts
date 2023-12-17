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

interface UpdatedParams {
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

export async function updateVehicle({
  mark,
  model,
  vehicleNumber,
  rentalAmount,
  image,
  isAvailable,
  description,
  ownerId,
  path,
}: UpdatedParams) {
  try {
    connectToDb()

    const vehicle = await Vehicle.findOne({ owner: ownerId })

    await Vehicle.findOneAndUpdate(
      { owner: ownerId },
      {
        mark: mark,
        model: model,
        vehicleNumber: vehicleNumber,
        rentalAmount: rentalAmount,
        image: image,
        isAvailable: isAvailable,
        description: description,
      },
      { upsert: true }
    )

    if (path === `/vehicles/edit/${vehicle._id}`) {
      revalidatePath(path)
    }
  } catch (error: any) {
    return {
      error: `Error adding vahicle: ${error.message}`,
    }
  }
}

export async function fetchUserVehicles(userId: string) {
  try {
    connectToDb()

    //Find current user by clerk id
    const user = await User.findOne({ id: userId })

    //Find all vehicles related to user
    const vehicles = await Vehicle.find({ owner: user._id }).sort({
      createdAt: "desc",
    })

    return vehicles
  } catch (error: any) {
    throw new Error(`Failed to fetch user vehicles: ${error.message}`)
  }
}

export async function fetchVehicleDetails(id: string) {
  try {
    connectToDb()

    const vehicleDetails = await Vehicle.findById(id).populate({
      path: "owner",
      model: User,
    })

    return vehicleDetails
  } catch (error: any) {
    throw new Error(`Failed to fetch vehicle details: ${error.message}`)
  }
}
