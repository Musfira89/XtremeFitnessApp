import express from "express";
import { createMeeting, getMeetings } from "../controllers/meetingController.js";

const router = express.Router();

router.post("/create", createMeeting);
router.get("/all", getMeetings);

export default router;
