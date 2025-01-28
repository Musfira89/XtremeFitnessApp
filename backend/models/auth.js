// models/auth.js
import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Make sure emails are unique
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
