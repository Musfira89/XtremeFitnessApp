import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  link: { type: String, required: true },
  expirationTime: { type: Number, required: true }, // Timestamp for expiration
  createdAt: { type: Date, default: Date.now },
});

const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;
