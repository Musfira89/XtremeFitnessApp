import express from "express";
import { generateWorkoutPlan } from "../controllers/workoutplan.js";

const router = express.Router();

// Generate workout plan for a user
router.get("/generate-workout-plan/:userId", generateWorkoutPlan);

export default router;