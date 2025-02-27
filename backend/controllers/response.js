import Response from "../models/Response.js";
import dotenv from "dotenv";
import WeeklyMealPlan from "../models/MealPlan.js";
import fetch from "node-fetch";
import jsonlint from "jsonlint";
import Question from "../models/question.js";
import mongoose from "mongoose";
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

export const generateMealPlan = async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({ message: "OpenAI API key is missing" });
    }

    const { userId } = req.params;
    console.log("Received userId:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }
    // Check if meal plan already exists
    const existingMealPlan = await WeeklyMealPlan.findOne({ userId });
    if (existingMealPlan) return res.status(200).json(existingMealPlan);

    // Fetch user responses
    const responses = await Response.find({ userId });
    if (!responses.length) {
      return res.status(404).json({ message: "No responses found" });
    }

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

    // AI Prompt
    const prompt = `Generate a 7-day structured meal plan in strict JSON format based on:  
    - Age: ${age}  
    - Gender: ${gender}  
    - Diet: ${dietPreference}  
    - Calories: ${caloriesNeeded}  
    - Goal: ${goal}  
    
    **Dietary Guidelines:**  
    - "Vegetarian/Vegan": No meat, poultry, seafood, or animal products.  
    - "Low-Carb/Keto": Keep carbs minimal.  
    - "High-Protein": Prioritize lean meats, legumes, and protein-rich foods.  
    
    **Weight Loss Plans (Non-Diabetic):**  
    - Low-carb days: 10-20% of calories from carbs.  
    - High-carb days: 40-50% of calories from carbs.  
    
    **Output JSON Format (Example for Monday):**  
    [
      {
        "day": "Monday",
        "meals": {
          "breakfast": { "name": "Meal Name", "calories": 300, "macros": {"carbs": 30, "protein": 20, "fat": 10}, "recipe": {"ingredients": ["..."], "instructions": ["..."]} },
          "lunch": { "name": "Meal Name", "calories": 450, "macros": {"carbs": 40, "protein": 30, "fat": 15}, "recipe": {"ingredients": ["..."], "instructions": ["..."]} },
          "dinner": { "name": "Meal Name", "calories": 500, "macros": {"carbs": 50, "protein": 40, "fat": 20}, "recipe": {"ingredients": ["..."], "instructions": ["..."]} },
          "snacks": { "name": "Snack Name", "calories": 200, "macros": {"carbs": 15, "protein": 5, "fat": 5}, "recipe": {"ingredients": ["..."], "instructions": ["..."]} }
        }
      },
      { "day": "Tuesday", "meals": { ... } },
      { "day": "Wednesday", "meals": { ... } },
      { "day": "Thursday", "meals": { ... } },
      { "day": "Friday", "meals": { ... } },
      { "day": "Saturday", "meals": { ... } },
      { "day": "Sunday", "meals": { ... } }
    ]
    
    Return **only valid JSON** with no extra text.`;

    const aiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 4096,
        }),
      }
    );

    if (!aiResponse.ok) {
      return res
        .status(500)
        .json({ message: "Failed to fetch meal plan from AI service" });
    }

    const aiData = await aiResponse.json();
    const mealPlanText = aiData.choices?.[0]?.message?.content?.trim();

    if (!mealPlanText) {
      return res
        .status(500)
        .json({ message: "Invalid meal plan response from AI" });
    }

    // Validate JSON
    let mealPlan;
    try {
      mealPlan = jsonlint.parse(mealPlanText);
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      return res.status(500).json({ message: "Invalid meal plan format" });
    }

    // Fetch meal images
    await fetchMealImages(mealPlan);

    // Save meal plan to DB
    const newMealPlan = new WeeklyMealPlan({ userId, meals: mealPlan });
    await newMealPlan.save();

    res.status(200).json(newMealPlan);
  } catch (error) {
    console.error("Error generating meal plan:", error);
    res.status(500).json({ message: "Failed to generate meal plan" });
  }
};

const fetchMealImages = async (mealPlan) => {
  if (!API_KEY) return;

  for (const day of mealPlan) {
    for (const mealType of Object.keys(day)) {
      if (mealType === "day") continue;
      const meal = day[mealType];

      try {
        // Fetch image
        const dalleResponse = await fetch(
          "https://api.openai.com/v1/images/generations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
              model: "dall-e-2",
              prompt: `A high-quality image of ${meal.name}, a delicious meal presented on a plate.`,
              n: 1,
              size: "1024x1024",
            }),
          }
        );

        const dalleData = await dalleResponse.json();
        meal.image =
          dalleData.data?.length > 0
            ? dalleData.data[0].url
            : "default-image-url.jpg";

        // Fetch video
        meal.video = await fetchMealVideo(meal.name);
      } catch (error) {
        console.error(`Error fetching media for ${meal.name}:`, error);
        meal.image = "default-image-url.jpg";
        meal.video = null;
      }
    }
  }
};

// **Fetch Meal Video Function**
const fetchMealVideo = async (mealName) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.error("YouTube API key is missing");
      return null;
    }

    const query = `${mealName} recipe`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&maxResults=1&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.warn(`No YouTube video found for ${mealName}`);
      return null;
    }

    return `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
  } catch (error) {
    console.error(`Error fetching video for ${mealName}:`, error);
    return null;
  }
};

export const getUserResponses = async (req, res) => {
  try {
    const { userId, category, weekNumber } = req.params; // Include weekNumber

    // Find responses for the given user, category, and week
    const responses = await Response.find({ userId, category, weekNumber });

    // Fetch all questions related to this category
    const questions = await Question.find({ category }).select(
      "_id questionText"
    );

    // Map responses to their respective questions
    const formattedResponses = questions.map((question) => {
      const response = responses.find((res) =>
        res.answers.some((ans) => ans.questionId.equals(question._id))
      );
      return {
        questionId: question._id,
        questionText: question.questionText,
        answer: response
          ? response.answers.find((ans) => ans.questionId.equals(question._id))
              .answer
          : "No Response",
      };
    });

    res.json(formattedResponses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveResponses = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { userId, category, answers, weekNumber } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    if (!weekNumber) {
      return res.status(400).json({ error: "Week number is required." });
    }

    const newResponse = new Response({
      userId,
      category,
      weekNumber, // Add this field
      answers,
    });

    await newResponse.save();
    res.status(201).json({ message: "Responses saved successfully" });
  } catch (error) {
    console.error("Error saving responses:", error);
    res.status(500).json({ message: "Failed to save responses" });
  }
};

export const getWeeksForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Received userId:", userId);

    // Find all responses for debugging
    const allResponses = await Response.find();
    console.log("All Responses in DB:", allResponses);

    // Find distinct weeks for the given user
    const weeks = await Response.distinct("weekNumber", { userId });
    console.log("Weeks Found:", weeks);

    res.json({ weeks });
  } catch (error) {
    console.error("Error fetching weeks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
