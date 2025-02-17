import Plan from "../models/Plan.js";

// Create a new Plan
export const createPlan = async (req, res) => {
  try {

    const { name, price, priceDetails, features, durationWeeks } = req.body;

    if (durationWeeks === undefined) {  // Ensure it's not missing
      return res.status(400).json({ message: "Duration in weeks is required" });
    }

    const existingPlan = await Plan.findOne({ name });
    if (existingPlan) return res.status(400).json({ message: "Plan already exists" });

    const newPlan = new Plan({ name, price, priceDetails, features, durationWeeks });
    await newPlan.save();

    res.status(201).json({ message: "Plan created successfully", plan: newPlan });
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans" });
  }
};