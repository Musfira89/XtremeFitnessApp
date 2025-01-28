// routes/question.js

import express from "express";
import { addQuestions, getQuestionsByCategory } from "../controllers/question.js";

const router = express.Router();

// Add a question
router.post("/add", addQuestions);

// Fetch questions by category
router.get("/:category", getQuestionsByCategory);

export default router;
