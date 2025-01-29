
import Response from "../models/Response.js";


const saveResponses = async (req, res) => {
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

export default saveResponses;
