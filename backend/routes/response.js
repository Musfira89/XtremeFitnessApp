
import express from "express";
import  {saveResponses ,getUserResponses, generateMealPlan, getWeeksForUser}  from "../controllers/response.js";

const router = express.Router();


router.post("/save", saveResponses);
// Get user responses

router.get("/:userId/:category/:weekNumber", getUserResponses);

// Generate AI-based meal plan
router.get("/:userId", generateMealPlan);

// Get all available weeks for a user
router.get("/weeks/:userId", getWeeksForUser);


export default router;
