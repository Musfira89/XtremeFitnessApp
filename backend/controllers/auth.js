import bcrypt from "bcrypt";
import User from "../models/auth.js";

// Register User
export const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  // Check if the user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ fullName, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login User
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

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        hasCompletedQuestionnaire: user.hasCompletedQuestionnaire,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate the ID and convert it to an ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    // Count signed-in and not-signed-in users
    const signedIn = await User.countDocuments({ isActive: true }); // Example: isActive indicates signed-in
    const totalUsers = await User.countDocuments({});
    const notSignedIn = totalUsers - signedIn;

    res.status(200).json({ signedIn, notSignedIn });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Failed to fetch analytics data." });
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
