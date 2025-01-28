import jwt from "jsonwebtoken";

const saveResponses = async (req, res) => {
  try {
    // Decode the JWT token to get the userId
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token in header
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, "your_secret_key"); // Decode the token
    const userId = decoded.id; // Extract userId from decoded token

    const { category, answers } = req.body;

    const newResponse = new Response({
      userId,
      category,
      answers,
    });

    await newResponse.save();
    res.status(201).json({ message: "Responses saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save responses" });
  }
};
export default saveResponses