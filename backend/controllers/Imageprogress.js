import Progress from "../models/progress.js";
import fs from "fs";

// Upload or Update Image
export const uploadProgressImage = async (req, res) => {
  try {
    const { userId, month, year } = req.body;
    const image = req.file.path; // Single image file

    if (!userId || !month || !year) {
      return res.status(400).json({ error: "User ID, month, and year are required!" });
    }

    let progress = await Progress.findOne({ userId, month, year });

    if (progress) {
      // Delete old image
      if (fs.existsSync(progress.image)) {
        fs.unlinkSync(progress.image);
      }
      progress.image = image; // Update with new image
    } else {
      progress = new Progress({ userId, month, year, image });
    }

    await progress.save();
    res.status(201).json({ message: "Progress image uploaded successfully", progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Image for a Specific Month and Year
export const getAllProgressImages = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Fetch all images of the user sorted by newest first
    const progress = await Progress.find({ userId }).sort({ year: -1, month: -1 });

    if (!progress.length) {
      return res.status(404).json({ message: "No progress images found." });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

