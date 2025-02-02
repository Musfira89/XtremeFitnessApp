import Response from "../models/Response.js";
import dotenv from "dotenv";
import MealPlan from "../models/MealPlan.js";
import fetch from "node-fetch";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export const generateMealPlan = async (req, res) => {
  try {
    if (!API_KEY || !SPOONACULAR_API_KEY) {
      return res
        .status(500)
        .json({ message: "API keys are not set in the environment variables" });
    }

    const { userId } = req.params;

    const existingMealPlan = await MealPlan.findOne({ userId });
    if (existingMealPlan) return res.status(200).json(existingMealPlan);

    const responses = await Response.find({ userId });
    if (!responses.length)
      return res.status(404).json({ message: "No responses found" });

    // Extract user preferences
    let age, gender, dietPreference, caloriesNeeded, goal;
    responses.forEach((response) => {
      if (response.category === "Demographics") {
        age = response.answers.find((a) => a.questionId === "age")?.answer;
        gender = response.answers.find(
          (a) => a.questionId === "gender"
        )?.answer;
      }
      if (response.category === "Diet and Nutrition") {
        dietPreference = response.answers.find(
          (a) => a.questionId === "foodPreferences"
        )?.answer;
        caloriesNeeded = response.answers.find(
          (a) => a.questionId === "caloriesNeeded"
        )?.answer;
      }
      if (response.category === "Fitness Goals") {
        goal = response.answers.find((a) => a.questionId === "goal")?.answer;
      }
    });

    const prompt = `Generate a 7-days structured meal plan in valid JSON format. The output should be an array of days, where each day follows this structure:
       [
         {
           "day": "Day 1 Monday",
           "breakfast": { "name": "Meal Name", "calories": 300, "carbs": 30, "protein": 20, "recipe": "Steps..." },
           "lunch": { ... },
           "dinner": { ... },
           "snacks": { ... }
         },
         { ... }]`;

    const aiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    if (!aiResponse.ok) {
      return res
        .status(500)
        .json({ message: "Failed to fetch meal plan from AI service" });
    }

    const aiData = await aiResponse.json();
    console.log("Raw AI Response:", JSON.stringify(aiData, null, 2));

    if (!aiData.candidates || !aiData.candidates[0]?.content?.parts[0]?.text) {
      return res.status(500).json({ message: "Failed to generate meal plan" });
    }

    const mealPlanText = aiData.candidates[0].content.parts[0].text.trim();

    // Strip the "```json" and "```" from the raw response
    const cleanedMealPlanText = mealPlanText.replace(/^```json|```$/g, '').trim();
    
    // Try parsing the cleaned text
    let mealPlan;
    try {
      if (!cleanedMealPlanText.startsWith("[") || !cleanedMealPlanText.endsWith("]")) {
        throw new Error("Invalid JSON structure");
      }
      mealPlan = JSON.parse(cleanedMealPlanText);
    } catch (error) {
      console.error("Failed to parse meal plan:", error);
      return res.status(500).json({ message: "Invalid meal plan format" });
    }
    
    await fetchMealImages(mealPlan);

    const newMealPlan = new MealPlan({ userId, meals: mealPlan });
    await newMealPlan.save();

    res.status(200).json(newMealPlan);
  } catch (error) {
    console.error("Error generating meal plan:", error);
    res.status(500).json({ message: "Failed to generate meal plan" });
  }
};
const cleanJsonString = (text) => {
  return text
    .replace(/\\json/g, "") // Fixed: Added correct backslash escaping in regex
    .replace(/\\\n/g, "") // Fixed: Correct line break handling with escaped backslash
    .replace(/\n/g, " ")
    .replace(/\r/g, "")
    .replace(/\s\s+/g, " ")
    .trim();
};

// Fetch meal images
const fetchMealImages = async (mealPlan) => {
  const promises = mealPlan.map(async (day) => {
    for (let mealType in day) {
      if (mealType === "day") continue;
      const meal = day[mealType];
      try {
        const spoonacularResponse = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${meal.name}&apiKey=${SPOONACULAR_API_KEY}&number=1`
        );
        const spoonacularData = await spoonacularResponse.json();
        if (spoonacularData.results && spoonacularData.results.length > 0) {
          meal.image = spoonacularData.results[0].image;
        } else {
          meal.image = "default-image-url.jpg";
        }
      } catch (error) {
        console.error("Error fetching meal image:", error);
        meal.image = "default-image-url.jpg";
      }
    }
  });

  await Promise.all(promises);
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
