import Feedback from '../models/Feedback.js';
import multer from 'multer';
import path from 'path';

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowedTypes.test(file.mimetype.toLowerCase());

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error('Only .png, .jpg, and .jpeg formats allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter }).fields([
  { name: 'beforeImage', maxCount: 1 },
  { name: 'afterImage', maxCount: 1 },
]);

export const submitFeedback = (req, res) => {
    upload(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });
  
      try {
        const { fullName, feedback, rating } = req.body;
        const { userId } = req.params; // Extract userId from params
  
        // Validate required fields
        if (!userId || !fullName || !feedback || !rating) {
          return res.status(400).json({ message: 'All fields are required.' });
        }
  
        // Validate images
        if (!req.files || !req.files.beforeImage || !req.files.afterImage) {
          return res.status(400).json({ message: 'Both before and after images are required.' });
        }
  
        // Validate and parse rating
        const parsedRating = parseInt(rating, 10);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
          return res.status(400).json({ message: 'Invalid rating. Must be between 1 and 5.' });
        }
  
        // Store image paths
        const beforeImagePath = req.files.beforeImage[0].path.replace(/\\/g, "/");
        const afterImagePath = req.files.afterImage[0].path.replace(/\\/g, "/");
  
        // Create feedback entry
        const newFeedback = new Feedback({
          userId,
          fullName,
          beforeImage: beforeImagePath,
          afterImage: afterImagePath,
          feedback,
          rating: parsedRating,
        });
  
        await newFeedback.save();
        return res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
      } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
      }
    });
  };
  


  export const getAllFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.find(); // No need to populate fullName since it's already in the model
  
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const formattedFeedbacks = feedbacks.map((fb) => ({
        _id: fb._id,
        userId: fb.userId, // Keep the userId
        fullName: fb.fullName, // Get fullName directly
        feedback: fb.feedback, // Get feedback
        rating: fb.rating, // Get rating
        beforeImage: `${baseUrl}/${fb.beforeImage}`, // Convert beforeImage to full URL
        afterImage: `${baseUrl}/${fb.afterImage}`, // Convert afterImage to full URL
        createdAt: fb.createdAt, // Optional: Include created timestamp
      }));
  
      res.status(200).json(formattedFeedbacks);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
