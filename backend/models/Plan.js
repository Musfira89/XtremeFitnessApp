import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  // Plan name
  price: { type: String, required: true },  // Price for the plan
  priceDetails: { type: String, required: true },  // Description of the price details (can include HTML tags if needed)
  features: [{ type: String }],  // List of features available in the plan
}, { timestamps: true });

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
