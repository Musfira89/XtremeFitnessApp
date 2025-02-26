import dotenv from "dotenv";
import WorkoutPlan from "../models/workout.js";
import Response from "../models/Response.js";
import fetch from "node-fetch";

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

export const generateWorkoutPlan = async (req, res) => {
  const { userId } = req.params;

  try {
    // **Check if a workout plan already exists for this user**
    const existingPlan = await WorkoutPlan.findOne({ userId });
    if (existingPlan) {
      return res.status(200).json({ 
        message: "Workout plan already exists", 
        workoutPlan: existingPlan 
      });
    }

    // **Fetch user responses**
    const responses = await Response.find({ userId });
    if (!responses.length) {
      return res.status(404).json({ message: "No responses found for this user" });
    }

    // **Extract user details**
    let fitnessGoal = "General Fitness";
    let experienceLevel = "Beginner";
    let equipment = [];
    let physicalLimitations = [];
    let dietType = "Balanced";
    let dailyExerciseDuration = "30-60 minutes";
    let workoutDays = 7; // Default to 3 days if not specified
    let workoutType = "Mixed"; // Could be 'Weightlifting', 'Bodyweight', or 'Mixed'

    responses.forEach((response) => {
      response.answers.forEach((answer) => {
        if (response.category === "Fitness Goals" && answer.questionText.toLowerCase().includes("goal")) {
          fitnessGoal = answer.answer;
        }
        if (response.category === "Physical Activity" && answer.questionText.toLowerCase().includes("experience")) {
          experienceLevel = answer.answer;
        }
        if (response.category === "Diet and Nutrition" && answer.questionText.toLowerCase().includes("diet")) {
          dietType = answer.answer;
        }
        if (response.category === "Physical Activity" && answer.questionText.toLowerCase().includes("equipment")) {
          equipment = answer.answer.split(",").map((e) => e.trim());
        }
        if (response.category === "Health and Medical" && answer.questionText.toLowerCase().includes("limitations")) {
          physicalLimitations = answer.answer.split(",").map((e) => e.trim());
        }
        if (response.category === "Physical Activity" && answer.questionText.toLowerCase().includes("exercise duration")) {
          dailyExerciseDuration = answer.answer;
        }
        if (response.category === "Physical Activity" && answer.questionText.toLowerCase().includes("workout days")) {
          workoutDays = parseInt(answer.answer) || 3;
        }
        if (response.category === "Physical Activity" && answer.questionText.toLowerCase().includes("workout type")) {
          workoutType = answer.answer;
        }
      });
    });
    // **Prepare AI prompt**
    const prompt = `
    Based on the user's fitness assessment, generate a structured weekly workout plan in JSON format:
    - Fitness Goal: ${fitnessGoal}
    - Experience Level: ${experienceLevel}
    - Available Equipment: ${equipment.length ? equipment.join(", ") : "None"}
    - Physical Limitations: ${physicalLimitations.length ? physicalLimitations.join(", ") : "None"}
    - Diet Type: ${dietType}
    - Daily Exercise Duration: ${dailyExerciseDuration}
    - Workout Days Per Week: ${workoutDays}
    - Preferred Workout Type: ${workoutType} (e.g., Weightlifting, Bodyweight, or Mixed)
    
    **Workout Plan Guidelines:**
    - **Each day must contain exactly 4 to 5 unique exercises.**
    - Ensure **no exercise is repeated** throughout the week.
    - If Weightlifting is chosen, include **strength training** with weights.
    - If Bodyweight is chosen, include **calisthenics** and resistance movements.
    - If Mixed is chosen, include **both types**.
    - Each day must focus on **different muscle groups**.
    - Each exercise must include:
      - **Exercise Name**
      - **Required Equipment (if any)**
      - **Short Description**
      - **Targeted Muscle Group**
      - **Recommended Sets & Reps**
    
    **Example Format (JSON):**
    {
      "Monday": [
        {
          "exercise": "Push-Ups",
          "equipment": "None",
          "description": "A basic bodyweight exercise for chest and triceps",
          "muscleGroup": "Chest, Triceps",
          "setsReps": "3 sets of 12 reps"
        },
        ...
      ],
      "Tuesday": [...],
      ...
    }
    
    **Important:**
    - **Do not repeat exercises across different days.**
    - Ensure each workout day has **exactly 4 to 5 exercises.**
    `;
    
  
    // **Fetch AI-generated workout plan**
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 4000,
      }),
    });

    if (!aiResponse.ok) {
      return res.status(500).json({ message: "Failed to fetch workout plan from AI" });
    }

    const aiData = await aiResponse.json();
    const workoutPlanJson = aiData.choices?.[0]?.message?.content?.trim();
    
    let workoutPlan;
    // **Ensure valid JSON**
    if (!workoutPlan || Object.keys(workoutPlan).length === 0) {
      return res.status(500).json({ message: "Invalid workout plan format from AI" });
    }
    
    // Ensure each day has 4-5 exercises
    for (const day in workoutPlan) {
      if (!Array.isArray(workoutPlan[day]) || workoutPlan[day].length < 4 || workoutPlan[day].length > 5) {
        console.error(`Invalid workout plan for ${day}:`, workoutPlan[day]);
        return res.status(500).json({ message: `Invalid workout plan: ${day} does not have 4-5 exercises` });
      }
    }
    


    try {
      workoutPlan = JSON.parse(workoutPlanJson);
    } catch (error) {
      console.error("Error parsing AI workout plan JSON:", error);
      return res.status(500).json({ message: "Invalid workout plan format from AI" });
    }

    // **Fetch video links**
    for (const day in workoutPlan) {
      for (let exercise of workoutPlan[day]) {
        exercise.videoLink = await fetchExerciseVideo(exercise.exercise) || null;
      }
    }

    // **Save workout plan to DB**
    const workoutDocument = new WorkoutPlan({ userId, weeklyWorkoutPlan: workoutPlan });
    await workoutDocument.save();

    res.status(200).json({ 
      message: "Workout plan generated successfully", 
      workoutPlan: workoutDocument 
    });

  } catch (error) {
    console.error("Error generating workout plan:", error);
    res.status(500).json({ message: "Failed to generate workout plan" });
  }
};

// **Fetch Exercise Video Function**
const fetchExerciseVideo = async (exerciseName) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    // List of trusted fitness channels
    const trustedChannels = [
      "UC68TLK0mAEzUyHx5x5k-S1Q", // Jeff Nippard
      "UCe0TLA0EsQbE-MjuHXevj2A", // Athlean-X
      "UCsKbelzYJ1d1zQuq5SxDvJA", // ThenX
    ];

    // Randomly select a channel from the trusted list
    const channelId = trustedChannels[Math.floor(Math.random() * trustedChannels.length)];

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      exerciseName + " workout"
    )}&channelId=${channelId}&type=video&maxResults=1&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("YouTube API Response:", data); // Debugging output

    if (!data.items || data.items.length === 0) {
      console.warn(`No YouTube video found for ${exerciseName}`);
      return null;
    }

    return `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
  } catch (error) {
    console.error(`Error fetching video for ${exerciseName}:`, error);
    return null;
  }
};



