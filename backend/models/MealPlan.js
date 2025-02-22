import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
  recipe: {
    ingredients: [String],  // List of ingredients
    instructions: [String],  // Step-by-step instructions
    nutritional_benefits: [String] // Key nutritional benefits
  },
  image: String,
  video: String
});

const mealPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meals: [
    {
      day: { type: String, required: true },
      breakfast: mealSchema,
      lunch: mealSchema,
      dinner: mealSchema,
      snacks: mealSchema
    },
  ],
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

const WeeklyMealPlan = mongoose.model("WeeklyMeal", mealPlanSchema);

export default WeeklyMealPlan;
