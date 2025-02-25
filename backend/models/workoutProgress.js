import mongoose from "mongoose";

const workoutprogressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    day: { type: String, required: true },
    exercises: [
      {
        index: { type: Number, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    progressPercentage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const WProgress = mongoose.model("workoutprogress", workoutprogressSchema);

export default WProgress;
