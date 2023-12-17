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
  createdAt: { type: Date, default: Date.now },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  rentals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rental",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
})

const Vehicle =
  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema)

export default Vehicle
