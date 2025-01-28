import Question from "../models/question.js";

// Add multiple questions at once
export const addQuestions = async (req, res) => {
  try {
    const questions = req.body;  // Expecting an array of questions in the request body

    // Insert multiple questions at once
    await Question.insertMany(questions);
    res.status(201).json({ message: "Questions added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add questions" });
  }
};

// Fetch questions by category
export const getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const questions = await Question.find({ category });
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};
