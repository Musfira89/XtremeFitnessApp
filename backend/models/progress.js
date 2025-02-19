import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: String, required: true }, // e.g., "January"
    year: { type: Number, required: true }, // e.g., 2024
    uploadDate: { type: Date, default: Date.now }, // Stores the exact date of upload
    image: { type: String, required: true }, // Only one image per month
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
