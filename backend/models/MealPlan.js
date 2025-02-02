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
      },
      lunch: {
        name: String,
        calories: Number,
        carbs: Number,
        protein: Number,
        recipe: String,
      },
      dinner: {
        name: String,
        calories: Number,
        carbs: Number,
        protein: Number,
        recipe: String,
      },
      snacks: {
        name: String,
        calories: Number,
        carbs: Number,
        protein: Number,
        recipe: String,
      }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});


const WeeklyMealPlan = mongoose.model("WeeklyMeal", mealPlanSchema);

export default WeeklyMealPlan;
