import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    hasCompletedQuestionnaire: { type: Boolean, default: false }, // Added back
    plan: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Plan",  // Reference to subscription plan
      default: null  // Null means Free plan
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "canceled", "pending", "inactive"], 
      default: "inactive"
    },
    trialExpiryDate: { type: Date, default: null } 

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
