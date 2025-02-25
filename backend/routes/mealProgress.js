import express from "express";
import { updateMealProgress, getMealProgress } from "../controllers/mealProgress.js";

const router = express.Router();

router.post("/update-mealprogress", updateMealProgress);
router.get("/get-mealprogress/:userId", getMealProgress);

export default router;
