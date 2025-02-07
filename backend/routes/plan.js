import express from "express";
import { createPlan ,getPlans } from "../controllers/plansController.js";

const router = express.Router();

// POST route to create new plans
router.post("/create", createPlan);
router.get("/get", getPlans);

export default router;
