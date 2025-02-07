import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  workoutSplit: {
    type: String,
    enum: ["3 Day Split", "4 Day Split", "5 Day Split", "6 Day Split"], // New field for workout splits
    required: true,
  },
  fitnessGoal: {
    type: String,
    enum: ["Weight loss", "Maintain", "Weight gain", "Muscle gain"], // New field for fitness goals
    required: true,
  },
  cardioFrequency: {
    type: String, // e.g., "Daily", "3-4 times per week", etc.
    required: true,
  },
  cardioDuration: {
    type: String, // e.g., "30 minutes", "20 minutes", etc.
    required: true,
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    default: "None", // Can be updated according to user input
  },
  description: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  physicalLimitations: {
    type: [String], // Array of limitations based on user input
    default: [],
  },
});

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutSchema);

export default WorkoutPlan;
