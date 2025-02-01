import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model, assuming you have a User model
    required: true,
  },
  mealPlan: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

export default MealPlan;
