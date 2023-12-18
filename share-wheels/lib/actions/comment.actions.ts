"use server"

import { revalidatePath } from "next/cache"
import Comment from "../models/comment.model"
import Vehicle from "../models/vehicle.model"
import { connectToDb } from "../mongoose"
import User from "../models/user.model"

export async function addCommentToVehicle(
  vehicleId: string,
  text: string,
  userId: string,
  path: string
) {
  connectToDb()

  try {
    const vehicle = await Vehicle.findById(vehicleId)

    if (!vehicle) {
      throw new Error("Vehicle not found!")
    }

    const comment = new Comment({
      author: userId,
      vehicleId: vehicleId,
      text: text,
    })

    const savedComment = await comment.save()

    vehicle.comments.push(savedComment._id)

    await vehicle.save()

    revalidatePath(path)
  } catch (error: any) {
    return {
      error: `Error adding comment to vehicle: ${error.message}`,
    }
  }
}

export async function fetchVehicleComments(vehicleId: string) {
  connectToDb()

  try {
    const comments = await Comment.find({ vehicleId: vehicleId }).populate({
      path: "author",
      model: User,
    })

    return comments
  } catch (error: any) {
    return {
      error: `Error fetching vehicle commments: ${error.message}`,
    }
  }
}
