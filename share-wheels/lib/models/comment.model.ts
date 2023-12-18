import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema)

export default Comment
