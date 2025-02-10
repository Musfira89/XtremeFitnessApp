import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Handle form submission
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, source, message } = req.body;

    if (!name || !email || !phone || !source || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, source, message });
    await newContact.save();

    res.status(201).json({ message: "Your message has been received!" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default router;
