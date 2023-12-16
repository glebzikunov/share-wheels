import mongoose from "mongoose"

const vehicleSchema = new mongoose.Schema({
  mark: { type: String, required: true },
  model: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  rentalAmount: { type: Number, required: true },
  image: String,
  description: String,
  isFree: { type: Boolean, default: true },
  isAvailable: Boolean,
  owner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  rentals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rental",
    },
  ],
})

const Vehicle =
  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema)

export default Vehicle
