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
import progressRoutes from "./routes/progress.js"
import supplementRoutes from "./routes/supplement.js"
import feedbackRoutes from './routes/feedbackRoutes.js';
import imageProgress from './routes/imageprogress.js'
import "./cron.js";  // Runs cron jobs
import WorkoutprogressRoutes from './routes/workoutProgress.js'
import MealprogressRoutes from './routes/mealProgress.js'


// import reviewRoutes from "./routes/reviews.js";

dotenv.config();


const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://www.xtremeft.com"],
  methods: ["GET", "POST"],
  credentials: true 
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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
app.use("/api", supplementRoutes);

app.use("/api", progressRoutes);  // Added
app.use('api/feedback', feedbackRoutes);
app.use('/api', imageProgress);
app.use("/api", WorkoutprogressRoutes);
app.use("/api", MealprogressRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
