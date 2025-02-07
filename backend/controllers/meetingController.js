import Meeting from "../models/Meeting.js";
import User from "../models/auth.js";
import { v4 as uuidv4 } from "uuid";

// Create a new meeting with a selected user
export const createMeeting = async (req, res) => {
  try {
    const { userId, topic } = req.body;

    // Validate userId and topic
    if (!userId || !topic) {
      return res.status(400).json({ success: false, message: "User ID and topic are required" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const meetingId = uuidv4();
    const meetingLink = `https://meet.jit.si/${meetingId}`;
    const expirationTime = Date.now() + 1800000; // 30 minutes

    // Save the meeting with the selected user, topic, and other details
    const newMeeting = new Meeting({
      link: meetingLink,
      expirationTime,
      createdAt: new Date(),
      user: userId,  // Link to the user
      topic, // Store the topic for the meeting
    });

    await newMeeting.save();

    // Respond with the meeting link and success message
    res.status(201).json({
      success: true,
      link: meetingLink,
      topic: newMeeting.topic,
      userId: userId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating meeting", error });
  }
};

// Get all meetings for a user
export const getMeetingsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const meetings = await Meeting.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user meetings" });
  }
};
