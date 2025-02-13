import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // URL of the uploaded image
  },
  role: {
    type: String,
    default: "Coach",
  },
  contact: {
    type: String,
  },
  experience: {
    type: String, // Example: "5 years"
  },
  specialization: {
    type: String, // Example: "Fitness and Nutrition"
  },
  certifications: {
    type: String, // Example: "Certified Personal Trainer (CPT)"
  },
  location: {
    type: String, // Example: "New York, USA"
  },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
