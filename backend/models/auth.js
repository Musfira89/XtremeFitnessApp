// models/auth.js
import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  hasCompletedQuestionnaire: { type: Boolean, default: false }, // New field
}, { timestamps: true });



// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
