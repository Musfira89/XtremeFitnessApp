import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    hasCompletedQuestionnaire: { type: Boolean, default: false },
    plan: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Plan",
      default: null 
    },
    planExpiry: { type: Date, default: null }, // Added expiry date
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
