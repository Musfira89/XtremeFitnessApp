import express from "express";
import { updateWProgress, getWProgress } from "../controllers/workoutProgress.js";

const router = express.Router();

router.post("/update-progress", updateWProgress);
router.get("/get-progress/:userId", getWProgress);

export default router;
