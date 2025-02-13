// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './mongoConnect.js';  // DB connection
import authRoutes from './routes/auth.js';
import questionRoutes from "./routes/question.js";
import responseRoutes from "./routes/response.js";
import adminRoutes from './routes/admin.js';
import meetingRoutes from "./routes/meetingRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import workoutPlanRoutes from "./routes/workoutplan.js";
import planRoutes from "./routes/plan.js";
import subscriptionRoutes from "./routes/subscription.js"
import contactRoutes from "./routes/contactRoutes.js";  // Added


dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Your frontend's URL
  methods: ["GET", "POST"],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/response", responseRoutes); 
app.use('/api/admin', adminRoutes);
app.use("/api/meeting", meetingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api", workoutPlanRoutes);
app.use("/api/plans", planRoutes);
app.use("/api", subscriptionRoutes);
app.use("/api/contact", contactRoutes);  // Added

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
