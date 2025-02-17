
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    location: { type: String, default: "" }, 
    contact: { type: String, default: "" }, 
    lastLogin: { type: Date, default: null },
    hasCompletedQuestionnaire: { type: Boolean, default: false },
    plan: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Plan",
      default: null 
    },
    planExpiry: { type: Date, default: null }, 
    subscriptionStatus: {
      type: String,
      enum: ["active", "canceled", "pending", "inactive"], 
      default: "inactive"
    },
    trialExpiryDate: { type: Date, default: null },
    referrerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    acceptTerms: { type: Boolean, required: true, default: false },

  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;