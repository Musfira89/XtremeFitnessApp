
import express from "express";
import  {saveResponses ,getUserResponses, generateMealPlan}  from "../controllers/response.js";

const router = express.Router();


router.post("/save", saveResponses);
// Get user responses

router.get("/:userId/:category", getUserResponses);

// Generate AI-based meal plan
router.get("/:userId", generateMealPlan);

export default router;
