import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  weeklyWorkoutPlan: {
    type: Object, // JSON format mein store hoga
    required: true,
  },
});

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutSchema);

export default WorkoutPlan;
