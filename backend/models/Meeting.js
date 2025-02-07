import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  link: { type: String, required: true },
  expirationTime: { type: Number, required: true }, // Timestamp for expiration
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to selected user
  topic: { type: String, required: true } // Add topic field

});

const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;
