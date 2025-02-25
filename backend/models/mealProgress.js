import mongoose from "mongoose";

const mealprogressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    day: { type: String, required: true }, // e.g., "Monday", "Tuesday"
    completed: { type: Boolean, default: false } // Whether the day's meals are completed
  },
  { timestamps: true }
);

const MealProgress = mongoose.model("MealProgress", mealprogressSchema);

export default MealProgress;
