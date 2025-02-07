import bcrypt from 'bcryptjs'; 
import { StatusCodes } from 'http-status-codes';
import Admin from '../models/admin.js';
import User from '../models/auth.js'


export const adminSignup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      fullName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(StatusCodes.CREATED).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating admin' });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid credentials' });
    }

    res.status(StatusCodes.OK).json({
      message: 'Login successful',
      admin: { id: admin._id, email: admin.email, fullName: admin.fullName },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error logging in' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("plan", "name"); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};
