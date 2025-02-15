import bcrypt from "bcrypt";
import User from "../models/auth.js";
import Response from "../models/Response.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

// Register User
export const registerUser = async (req, res) => {
  const { fullName, email, password, acceptTerms } = req.body;

  try {
    if (!acceptTerms) {
      return res.status(400).json({ message: "You must accept the terms and conditions." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

     // Update lastLogin field
     user.lastLogin = new Date();
     await user.save();
 
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const hasResponses = await Response.findOne({ userId: user._id });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        hasCompletedQuestionnaire: user.hasCompletedQuestionnaire,
        hasResponses: !!hasResponses,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Mark Questionnaire as Completed
export const markQuestionnaireComplete = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndUpdate(userId, { hasCompletedQuestionnaire: true });

    res.status(200).json({ message: "Questionnaire completion recorded" });
  } catch (error) {
    console.error("Error updating questionnaire completion:", error);
    res.status(500).json({ message: "Error updating user status", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("plan", "name"); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getTotalUsers = async (req, res) => {
  try {
    // Get the first user's registration date
    const firstUser = await User.find().sort({ createdAt: 1 }).limit(1);

    if (!firstUser.length) {
      return res.status(200).json([]);
    }

    const startDate = firstUser[0].createdAt; // First user signup date
    const endDate = new Date(); // Today

    // Aggregate user count per month
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by month
          count: { $sum: 1 },
          users: { $push: "$fullName" }, // Store user names for hover
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(userGrowth);
  } catch (error) {
    console.error("Error fetching user growth data:", error);
    res.status(500).json({ message: "Error fetching user growth data", error });
  }
};

export const getUserPlan = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("plan", "name"); // Fetch user with plan name

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ planName: user.plan ? user.plan.name : "Free Plan" });
  } catch (error) {
    console.error("Error fetching user plan:", error);
    res.status(500).json({ message: "Error fetching plan", error });
  }
};
