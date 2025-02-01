
import Response from "../models/Response.js";
import dotenv from "dotenv";
import MealPlan from "../models/MealPlan.js"; 

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY; // Store your Gemini AI API Key in .env

export const generateMealPlan = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user already has a meal plan
    const existingMealPlan = await MealPlan.findOne({ userId });

    // If meal plan already exists, return the existing one
    if (existingMealPlan) {
      return res.status(200).json({ mealPlan: existingMealPlan.mealPlan });
    }

    // If meal plan doesn't exist, generate it using the health responses
    const responses = await Response.find({ userId });

    if (!responses.length) {
      return res.status(404).json({ message: "No responses found" });
    }

    // Extract user details (age, gender, diet preference, etc.) from responses
    let age, gender, dietPreference, caloriesNeeded, goal;
    responses.forEach((response) => {
      if (response.category === "Demographics") {
        age = response.answers.find((a) => a.questionId === "age")?.answer;
        gender = response.answers.find((a) => a.questionId === "gender")?.answer;
      }
      if (response.category === "Diet and Nutrition") {
        dietPreference = response.answers.find((a) => a.questionId === "foodPreferences")?.answer;
        caloriesNeeded = response.answers.find((a) => a.questionId === "caloriesNeeded")?.answer;
      }
      if (response.category === "Fitness Goals") {
        goal = response.answers.find((a) => a.questionId === "goal")?.answer;
      }
    });

    // AI prompt
    const prompt = `
      Generate a 7-day meal plan for a user:
      - Age: ${age}
      - Gender: ${gender}
      - Diet Preference: ${dietPreference}
      - Calories Needed: ${caloriesNeeded}
      - Fitness Goal: ${goal}
      - Include breakfast, lunch, dinner, and snacks for each day.
    `;

    // Call Google Gemini API to generate the meal plan
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    // Handle API errors
    if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
      return res.status(500).json({ message: "Failed to generate meal plan" });
    }

    const mealPlan = data.candidates[0].content.parts[0].text.trim();

    // Save the generated meal plan to the database
    const newMealPlan = new MealPlan({ userId, mealPlan });
    await newMealPlan.save();

    res.status(200).json({ mealPlan });

  } catch (error) {
    console.error("Error generating meal plan:", error);
    res.status(500).json({ message: "Failed to generate meal plan" });
  }
};

// Fetch responses for a user
export const getUserResponses = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("User ID:", userId); // Debugging line
    const responses = await Response.find({ userId });

    if (!responses.length) {
      return res.status(404).json({ message: "No responses found" });
    }

    res.status(200).json(responses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ message: "Failed to fetch responses" });
  }
};




export const saveResponses = async (req, res) => {
  try {
    const { userId, category, answers } = req.body; // Directly get userId from the request body

    const newResponse = new Response({
      userId,
      category,
      answers,
    });

    await newResponse.save();
    res.status(201).json({ message: "Responses saved successfully" });
  } catch (error) {
    console.error("Error saving responses:", error);
    res.status(500).json({ message: "Failed to save responses" });
  }
};