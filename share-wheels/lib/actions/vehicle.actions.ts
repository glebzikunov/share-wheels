"use server"

import { revalidatePath } from "next/cache"
import { connectToDb } from "../mongoose"
import User from "../models/user.model"
import Vehicle from "../models/vehicle.model"
import { FilterQuery, SortOrder } from "mongoose"

interface Params {
  mark: string
  model: string
  vehicleNumber: string
  rentalAmount: number
  image: string
  isAvailable: string
  description: string
  latitude: number
  longitude: number
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
  latitude,
  longitude,
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
      latitude: latitude,
      longitude: longitude,
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

export async function fetchVehicles({
  searchString = "",
  sortBy = "desc",
}: {
  userId: string
  searchString?: string
  sortBy?: SortOrder
}) {
  try {
    if (searchString.trim() === "") {
      return []
    }

    connectToDb()

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i")

    // Create an initial query object to filter vehicles.
    const query: FilterQuery<typeof Vehicle> = {}

    // If the search string is not empty, add the $or operator to match either username or name fields.
    query.$or = [{ mark: { $regex: regex } }, { model: { $regex: regex } }]
    query.isFree = true
    // Define the sort options for the fetched vehicles based on createdAt field and sort order.
    const sortOptions = { createdAt: sortBy }

    const vehicleQuery = Vehicle.find(query)
      .select("mark model image latitude longitude rentalAmount")
      .sort(sortOptions)

    const vehicles = await vehicleQuery.exec()

    return vehicles
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    throw error
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

export async function addVehicleToFavourites(userId: string, id: string) {
  try {
    connectToDb()

    const vehicle = await Vehicle.findById(id)
    const user = await User.findById(userId).populate({
      path: "favourites",
      model: Vehicle,
    })

    if (
      user.favourites.some(
        (fav: any) => fav._id.toString() === vehicle._id.toString()
      )
    ) {
      throw new Error("You already have this vehicle in favourites")
    }

    await User.findByIdAndUpdate(userId, {
      $push: { favourites: vehicle._id },
    })

    return vehicle
  } catch (error: any) {
    return {
      error: `Error adding vehicle into favourites: ${error.message}`,
    }
  }
}

export async function deleteVehicleFromFavourites(
  userId: string,
  id: string,
  path: string
) {
  try {
    connectToDb()

    const vehicle = await Vehicle.findById(id)

    await User.findByIdAndUpdate(userId, {
      $pull: { favourites: vehicle._id },
    })

    revalidatePath(path)
  } catch (error: any) {
    return {
      error: `Error deleting vehicle from favourites: ${error.message}`,
    }
  }
}

export async function fetchFavouritesVehicles(userId: string) {
  try {
    connectToDb()

    //Find current user by clerk id
    const user = await User.findOne({ id: userId }).populate({
      path: "favourites",
      model: Vehicle,
    })

    //Find all favourite vehicles related to user
    const vehicles = user.favourites

    return vehicles
  } catch (error: any) {
    throw new Error(`Failed to fetch user favourite vehicles: ${error.message}`)
  }
}
