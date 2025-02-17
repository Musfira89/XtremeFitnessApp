import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  // Plan name
  price: { type: String, required: true },  // Price for the plan
  priceDetails: { type: String, required: true },  // Description of the price details
  features: [{ type: String }],  // List of features available in the plan
  durationWeeks: { type: Number, required: true },  // Plan duration in weeks
}, { timestamps: true });

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
