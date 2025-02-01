import Meeting from "../models/Meeting.js";
import { v4 as uuidv4 } from "uuid";

// Create a new meeting and set expiration time (1 sec for testing)
export const createMeeting = async (req, res) => {
  try {
    const meetingId = uuidv4();
    const meetingLink = `https://meet.jit.si/${meetingId}`;

    // Set expiration time (30 minutes)
    const expirationTime = Date.now() + 1800000; // 30 minutes in milliseconds

    const newMeeting = new Meeting({
      link: meetingLink,
      expirationTime: expirationTime,
    });

    await newMeeting.save();

    res.status(201).json({ success: true, link: meetingLink });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating meeting" });
  }
};

// Get all meetings, but exclude expired ones
export const getMeetings = async (req, res) => {
  try {
    const currentTime = Date.now();
    const meetings = await Meeting.find({
      expirationTime: { $gt: currentTime }, // Only get meetings that have not expired
    }).sort({ createdAt: -1 });

    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching meetings" });
  }
};
