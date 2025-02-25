import MealProgress from "../models/mealProgress.js";

// Update Meal Progress
export const updateMealProgress = async (req, res) => {
  try {
    const { userId, day, completed } = req.body;

    if (!userId || !day) {
      return res.status(400).json({ message: "User ID and day are required." });
    }

    // Find existing record for the user & day
    let mealProgress = await MealProgress.findOne({ userId, day });

    if (mealProgress) {
      // Update existing progress
      mealProgress.completed = completed;
      await mealProgress.save();
    } else {
      // Create a new record if not found
      mealProgress = new MealProgress({ userId, day, completed });
      await mealProgress.save();
    }

    res.status(200).json({ message: "Meal progress updated successfully", mealProgress });
  } catch (error) {
    console.error("Error updating meal progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Meal Progress for a User
export const getMealProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const progress = await MealProgress.find({ userId });

    if (!Array.isArray(progress)) {
      return res.status(200).json([]); // Ensure always returning an array
    }

    res.status(200).json(progress);
  } catch (error) {
    console.error("Error fetching meal progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
