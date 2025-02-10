import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  source: { type: String, required: true },
  message: { type: String, required: true }, // Added message field
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Contact", ContactSchema);
