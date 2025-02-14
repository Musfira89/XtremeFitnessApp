import express from "express";
import { generateSupplement } from "../controllers/supplement.js";

const router = express.Router();

// Generate workout plan for a user
router.get("/generate-supplement/:userId", generateSupplement);

export default router;