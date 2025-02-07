import dotenv from "dotenv";
import WorkoutPlan from "../models/workout.js";
import Response from "../models/Response.js";  // Importing the Response model
import fetch from "node-fetch";

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

export const generateWorkoutPlan = async (req, res) => {
  const { userId } = req.params;

  try {
    // Step 1: Fetch user responses from the database
    const responses = await Response.find({ userId });

    if (!responses.length) {
      return res.status(404).json({ message: "No responses found for this user" });
    }

    // Extract user preferences from the responses
    let fitnessGoal = "Weight loss"; // Default goal
    let experienceLevel = "Beginner"; // Default experience level
    let equipment = ["Bodyweight"]; // Default equipment (assuming no gym access)
    let physicalLimitations = []; // No limitations by default

    responses.forEach((response) => {
      // Parse fitness goals
      if (response.category === "Fitness Goals") {
        fitnessGoal = response.answers.find(a => a.questionId.toString() === "goal")?.answer || fitnessGoal;
      }
      // Parse physical activity level
      if (response.category === "Physical Activity") {
        experienceLevel = response.answers.find(a => a.questionId.toString() === "experienceLevel")?.answer || experienceLevel;
      }
      // Parse equipment preferences
      if (response.category === "Diet and Nutrition") {
        equipment = response.answers.find(a => a.questionId.toString() === "equipment")?.answer || equipment;
      }
      // Parse physical limitations
      if (response.category === "Health and Medical") {
        physicalLimitations = response.answers.find(a => a.questionId.toString() === "limitations")?.answer || physicalLimitations;
      }
    });

    // Check if necessary data is provided, otherwise fallback to defaults
    if (!fitnessGoal || !experienceLevel) {
      return res.status(400).json({ message: "Missing required user data" });
    }

    // Step 2: Generate workout plan using AI (OpenAI API)
    let workoutSplit = "3 Day Split"; // Default to 3-day split if not specified
    let cardioFrequency = "Daily"; // Default to daily cardio if not specified
    let cardioDuration = "30 minutes"; // Default cardio duration

    if (fitnessGoal === "Weight loss") {
      cardioFrequency = "Daily";
      cardioDuration = "30 minutes";
    } else if (fitnessGoal === "Maintain") {
      cardioFrequency = "3-4 times per week";
      cardioDuration = "25-30 minutes";
    } else if (fitnessGoal === "Weight gain") {
      cardioFrequency = "3 times per week";
      cardioDuration = "15-20 minutes";
    } else if (fitnessGoal === "Muscle gain") {
      cardioFrequency = "3 times per week";
      cardioDuration = "20 minutes";
    }

    const prompt = `
      Generate a ${workoutSplit} workout plan for a ${experienceLevel} with the following details:
      - Fitness Goal: ${fitnessGoal}
      - Cardio Frequency: ${cardioFrequency} (${cardioDuration} each session)
      - Equipment available: ${equipment.join(", ")}
      - Physical Limitations: ${physicalLimitations.join(", ")}
      - Include exercise names, descriptions, and instructional video links for each day.
      The plan should focus on exercises suited to the user's fitness level and available equipment.
    `;
    
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
      }),
    });

    if (!aiResponse.ok) {
      return res.status(500).json({ message: "Failed to fetch workout plan from AI" });
    }

    const aiData = await aiResponse.json();
    const workoutPlanText = aiData.choices?.[0]?.message?.content?.trim();

    if (!workoutPlanText) {
      return res.status(500).json({ message: "Invalid workout plan response from AI" });
    }

    // Step 3: Parse the workout plan text
    const workoutPlan = parseWorkoutPlan(workoutPlanText);

    // Step 4: Fetch video links for each exercise (YouTube API or another source)
    for (let dayPlan of workoutPlan) {
      for (let exercise of dayPlan.exercises) {
        const videoLink = await fetchExerciseVideo(exercise.name);
        exercise.videoLink = videoLink || "default-video-url"; // Default video URL if not found
      }
    }

    // Step 5: Save workout plan to DB
    const workoutPlanDb = await WorkoutPlan.insertMany(workoutPlan);

    res.status(200).json({ message: "Workout plan generated successfully", workoutPlan: workoutPlanDb });
  } catch (error) {
    console.error("Error generating workout plan:", error);
    res.status(500).json({ message: "Failed to generate workout plan" });
  }
};


// Helper function to parse the workout plan text
const parseWorkoutPlan = (workoutPlanText) => {
  const workoutPlan = [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const exercises = workoutPlanText.split("\n");

  let currentDay = "";

  exercises.forEach((line) => {
    if (days.includes(line.trim())) {
      currentDay = line.trim();
      workoutPlan.push({ day: currentDay, exercises: [] });
    } else if (currentDay) {
      workoutPlan[workoutPlan.length - 1].exercises.push({ name: line.trim() });
    }
  });

  return workoutPlan;
};

// Helper function to fetch exercise video (YouTube or other services)
const fetchExerciseVideo = async (exerciseName) => {
  try {
    // Using YouTube API or similar to fetch video URL based on exercise name
    const youtubeAPIKey = process.env.YOUTUBE_API_KEY;
    const youtubeResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${exerciseName}&key=${youtubeAPIKey}`);
    const youtubeData = await youtubeResponse.json();

    if (youtubeData.items && youtubeData.items.length > 0) {
      return `https://www.youtube.com/watch?v=${youtubeData.items[0].id.videoId}`;
    }

    return null;
  } catch (error) {
    console.error("Error fetching exercise video:", error);
    return null;
  }
};
