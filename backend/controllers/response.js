import Response from "../models/Response.js";
import dotenv from "dotenv";
import WeeklyMealPlan from "../models/MealPlan.js";
import fetch from "node-fetch";
import jsonlint from "jsonlint";
import Question from "../models/question.js"
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
    const prompt = `Generate a structured meal plan for 7 days in strict JSON format.
    The meal plan should be customized based on the following user preferences:
    - Age: ${age}
    - Gender: ${gender}
    - Diet Preference: ${dietPreference}
    - Calories Needed: ${caloriesNeeded}
    - Fitness Goal: ${goal}
    
    The JSON must be a valid array of objects with no missing brackets, no trailing commas, and correct string formatting.
    Structure:
    [
      {
        "day": "Monday",
        "breakfast": { 
          "name": "Meal Name", 
          "calories": 300, 
          "carbs": 30, 
          "protein": 20, 
          "recipe": "1/2 cup old-fashioned oats cooked with 1 cup 1 percent milk, an apple or banana, and 2 tablespoons chopped walnuts" 
        },
        "lunch": { 
          "name": "Meal Name", 
          "calories": 450, 
          "carbs": 40, 
          "protein": 30, 
          "recipe": "Steps..." 
        },
        "dinner": { 
          "name": "Meal Name", 
          "calories": 500, 
          "carbs": 50, 
          "protein": 40, 
          "recipe": "Steps..." 
        },
        "snacks": { 
          "name": "Snack Name", 
          "calories": 200, 
          "carbs": 15, 
          "protein": 5, 
          "recipe": "Steps..." 
        }
      },
      { "day": "Day 2", "breakfast": { ... }, "lunch": { ... }, "dinner": { ... }, "snacks": { ... } }
    ]
    
    ALL WEIGHTLOSS PLANS MUST BE CARB CYCLING UNLESS CLIENT IS A DIABETIC.
    - Low carb days: 10-20% of the calories must come from carbs.
    - High carb days: 40-50% of the calories must come from carbs.
    
    For example:
    Monday (High-Carb Day)
    Breakfast: 1/2 cup old-fashioned oats cooked with 1 cup 1 percent milk, an apple or banana, and 2 tablespoons chopped walnuts (443 cals, 67 g carbs, 16 g protein, 15 g fat)
    
    Return only JSON, no additional text.`;

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
          max_tokens: 2000,
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

        if (dalleResponse.ok && dalleData.data?.length > 0) {
          meal.image = dalleData.data[0].url;
        } else {
          console.error(`Image generation failed for ${meal.name}`, dalleData);
          meal.image = "default-image-url.jpg";
        }
      } catch (error) {
        console.error(`Error generating image for ${meal.name}:`, error);
        meal.image = "default-image-url.jpg";
      }
    }
  }
};


export const getUserResponses = async (req, res) => {
  try {
    const { userId, category, weekNumber } = req.params; // Include weekNumber

    // Find responses for the given user, category, and week
    const responses = await Response.find({ userId, category, weekNumber });

    // Fetch all questions related to this category
    const questions = await Question.find({ category }).select("_id questionText");

    // Map responses to their respective questions
    const formattedResponses = questions.map((question) => {
      const response = responses.find((res) => 
        res.answers.some((ans) => ans.questionId.equals(question._id))
      );
      return {
        questionId: question._id,
        questionText: question.questionText,
        answer: response
          ? response.answers.find((ans) => ans.questionId.equals(question._id)).answer
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
      weekNumber,  // Add this field
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

