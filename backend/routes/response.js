// routes/response.js

import express from "express";
import  {saveResponses ,getUserResponses, generateMealPlan}  from "../controllers/response.js";

const router = express.Router();

// Save user responses
router.post("/save", saveResponses);
// Get user responses

router.get("/:userId", getUserResponses);

// Generate AI-based meal plan
router.get("/generate-meal-plan/:userId", generateMealPlan);

export default router;
