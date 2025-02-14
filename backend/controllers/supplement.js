import dotenv from "dotenv";
import Supplement from "../models/supplement.js";
import Response from "../models/Response.js";
import fetch from "node-fetch";
import mongoose from "mongoose";

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

export const generateSupplement = async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({ message: "OpenAI API key is missing" });
    }

    const { userId } = req.params;
    console.log("Received userId:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Check if supplement recommendation already exists
    const existingSupplement = await Supplement.findOne({ userId });
    if (existingSupplement) return res.status(200).json(existingSupplement);

    // Fetch user responses
    const responses = await Response.find({ userId });
    if (!responses.length) {
      return res.status(404).json({ message: "No responses found" });
    }

    /// Extract relevant user details
let age, gender, weight, fitnessGoal, dietaryRestrictions, supplement, deficiencies;

responses.forEach((response) => {
  if (response.category === "Demographics") {
    age = response.answers.find((a) => a.questionId === "age")?.answer;
    gender = response.answers.find((a) => a.questionId === "gender")?.answer;
    weight = response.answers.find((a) => a.questionId === "weight")?.answer;
  }
  if (response.category === "Fitness Goals") {
    fitnessGoal = response.answers.find((a) => a.questionId === "goal")?.answer;
  }
  if (response.category === "Diet and Nutrition") {
    dietaryRestrictions = response.answers.find((a) => a.questionId === "dietaryRestrictions")?.answer;
    supplement = response.answers.find((a) => a.questionId === "supplement")?.answer;
    deficiencies = response.answers.find((a) => a.questionId === "deficiencies")?.answer;
  }
});

    // AI Prompt
    const prompt = `Generate a supplement recommendation list in strict JSON format based on the following user details:
    - Age: ${age}
    - Gender: ${gender}
    - Weight: ${weight}
    - Fitness Goal: ${fitnessGoal}
    - Dietary Restrictions: ${dietaryRestrictions}
    - Deficiencies: ${deficiencies}
    - supplement: ${supplement}

    
    Provide a structured JSON array like this:
    [
      {
        "name": "Supplement Name",
        "description": "Brief description of benefits",
        "category": "Protein, Vitamins, Minerals, etc.",
        "recommendedFor": "Specific needs like muscle gain, weight loss, energy boost, etc.",
        "price": "Estimated price range in USD",
        "amazonLink": "Amazon product link"
      }
    ]

    Ensure all values are properly formatted and realistic. Do not include additional text, return only JSON.`;

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
      }),
    });

    if (!aiResponse.ok) {
      return res.status(500).json({ message: "Failed to fetch supplement recommendations from AI" });
    }

    const aiData = await aiResponse.json();
    const supplementText = aiData.choices?.[0]?.message?.content?.trim();

    if (!supplementText) {
      return res.status(500).json({ message: "Invalid supplement response from AI" });
    }

    // Parse AI response JSON
    let supplements;
    try {
      supplements = JSON.parse(supplementText);
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      return res.status(500).json({ message: "Invalid supplement format from AI" });
    }

    // Generate images for supplements
    await fetchSupplementImages(supplements);

    // Save supplement recommendations to DB
    const newSupplementPlan = new Supplement({ userId, supplements });
    await newSupplementPlan.save();

    res.status(200).json(newSupplementPlan);
  } catch (error) {
    console.error("Error generating supplement recommendations:", error);
    res.status(500).json({ message: "Failed to generate supplement recommendations" });
  }
};

// Function to generate images for supplements
const fetchSupplementImages = async (supplements) => {
  if (!API_KEY) return;

  for (const supplement of supplements) {
    try {
      const dalleResponse = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "dall-e-2",
          prompt: `A high-quality product image of ${supplement.name}, a dietary supplement in a bottle or packaging.`,
          n: 1,
          size: "1024x1024",
        }),
      });

      const dalleData = await dalleResponse.json();

      if (dalleResponse.ok && dalleData.data?.length > 0) {
        supplement.image = dalleData.data[0].url;
      } else {
        console.error(`Image generation failed for ${supplement.name}`, dalleData);
        supplement.image = "default-image-url.jpg";
      }
    } catch (error) {
      console.error(`Error generating image for ${supplement.name}:`, error);
      supplement.image = "default-image-url.jpg";
    }
  }
};
