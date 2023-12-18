import mongoose from "mongoose"

const rentalSchema = new mongoose.Schema({
  rental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  totalAmount: Number,
  type: { type: String, required: true },
})

const Rental = mongoose.models.Rental || mongoose.model("Rental", rentalSchema)

export default Rental
