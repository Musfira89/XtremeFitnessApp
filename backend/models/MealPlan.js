import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meals: [
    {
      day: { type: String, required: true },
      breakfast: {
        name: String,
        calories: Number,
        carbs: Number,
        protein: Number,
        recipe: String,
        image: String, // Meal image
        video: String, // Added video field
      },
      lunch: {
        name: String,
        calories: Number,
        carbs: Number,
        protein: Number,
        recipe: String,
        image: String,
        video: String, // Added video field
      },
      dinner: {
        name: String,
        calories: Number,
        carbs: Number,
        protein: Number,
        recipe: String,
        image: String,
        video: String, // Added video field
      },
      snacks: {
        name: String,
        calories: Number,
        carbs: Number,
        protein: Number,
        recipe: String,
        image: String,
        video: String, // Added video field
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

const WeeklyMealPlan = mongoose.model("WeeklyMeal", mealPlanSchema);

export default WeeklyMealPlan;
