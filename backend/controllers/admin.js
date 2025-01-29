import bcrypt from 'bcryptjs'; 
import { StatusCodes } from 'http-status-codes';
import User from '../models/auth.js'; // Ensure this import is at the top of the file

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "adminPassword"; // Plain password, we'll hash it for comparison

// Hash the fixed admin password for comparison
const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email matches the hard-coded email
    if (email !== ADMIN_EMAIL) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid email' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid credentials' });
    }

    // If the credentials are correct, return a success response
    return res.status(StatusCodes.OK).json({
      message: 'Login successful',
      admin: { email }, // Include the email in the response
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Something went wrong. Please try again later.',
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};
