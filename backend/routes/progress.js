import express from "express";
import { getUserProgress } from "../controllers/progressController.js";

const router = express.Router();

// Route to fetch user progress data
router.get("/progress/:userId", getUserProgress);

export default router;
