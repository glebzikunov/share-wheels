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

export async function fetchCurrentRentals(userId: string) {
  try {
    connectToDb()

    const user = await User.findOne({ id: userId })

    const rentals = await Rental.findOne({
      rental: user._id,
      type: "Active",
    }).populate({
      path: "vehicle",
      model: Vehicle,
    })

    return rentals
  } catch (error: any) {
    return {
      error: `Error fetching active rentals: ${error.message}`,
    }
  }
}

export async function fetchPreviousRentals(userId: string) {
  try {
    connectToDb()

    const user = await User.findOne({ id: userId })

    const rentals = await Rental.find({
      rental: user._id,
      type: "Finished",
    })
      .sort({ startTime: "desc" })
      .populate({
        path: "vehicle",
        model: Vehicle,
      })

    return rentals
  } catch (error: any) {
    return {
      error: `Error fetching rental history: ${error.message}`,
    }
  }
}

export async function fetchRentalInfo(userId: string) {
  try {
    connectToDb()

    const user = await User.findOne({ id: userId })

    const rentalInfo = await Rental.findOne({
      rental: user._id,
      type: "Active",
    })
      .select("startTime")
      .populate({ path: "vehicle", model: Vehicle })
      .select("rentalAmount")

    const endTime = Date.now()
    const timeDifference = endTime - rentalInfo.startTime
    const rideTimeInMinutes = Math.ceil(timeDifference / (1000 * 60))

    if (rideTimeInMinutes <= 1) {
      return {
        time: endTime,
        totalAmount: parseFloat(
          (rentalInfo.vehicle.rentalAmount * 1).toString()
        ),
      }
    } else {
      return {
        time: endTime,
        totalAmount: parseFloat(
          (rentalInfo.vehicle.rentalAmount * rideTimeInMinutes).toString()
        ),
      }
    }
  } catch (error: any) {
    throw new Error(`Error culculationg rental amount: ${error.message}`)
  }
}

export async function updateRentalStatus(
  userId: string,
  endTime: number,
  totalAmount: number,
  lat: number,
  lng: number
) {
  try {
    connectToDb()

    const user = await User.findOne({ id: userId })

    const rentalInfo = await Rental.findOne({
      rental: user._id,
      type: "Active",
    }).populate({ path: "vehicle", model: Vehicle })

    await Vehicle.findByIdAndUpdate(rentalInfo.vehicle._id, {
      isFree: true,
      latitude: lat,
      longitude: lng,
    })

    await Rental.findByIdAndUpdate(rentalInfo._id, {
      type: "Finished",
      endTime: endTime,
      totalAmount: totalAmount,
    })

    await User.findByIdAndUpdate(user._id, {
      $pull: { rentals: rentalInfo._id },
    })
  } catch (error: any) {
    throw new Error(`Error updating rental: ${error.message}`)
  }
}
