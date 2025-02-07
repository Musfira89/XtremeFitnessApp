import express from "express";
import { createMeeting, getMeetingsForUser } from "../controllers/meetingController.js";

const router = express.Router();

router.post("/create", createMeeting); // Admin creates a meeting for a user
router.get("/user/:userId", getMeetingsForUser); // Fetch meetings for a user

export default router;
