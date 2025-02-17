import express from 'express';
import { submitFeedback, getAllFeedbacks } from '../controllers/feedback.js';

const router = express.Router();

router.post('/submit/:userId', submitFeedback);

router.get('/all', getAllFeedbacks);

export default router;