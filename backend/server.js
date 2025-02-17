import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';  // Security
import morgan from 'morgan';  // Logging
import bodyParser from 'body-parser';
import connectDB from './mongoConnect.js';  // Database connection
import authRoutes from './routes/auth.js';
import questionRoutes from "./routes/question.js";
import responseRoutes from "./routes/response.js";
import adminRoutes from './routes/admin.js';
import meetingRoutes from "./routes/meetingRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import workoutPlanRoutes from "./routes/workoutplan.js";
import planRoutes from "./routes/plan.js";
import subscriptionRoutes from "./routes/subscription.js";
import contactRoutes from "./routes/contactRoutes.js";
import progressRoutes from "./routes/progress.js";
import supplementRoutes from "./routes/supplement.js";
import feedbackRoutes from './routes/feedbackRoutes.js';
import "./cron.js";  // Initialize cron jobs

dotenv.config();

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("Error: Missing email credentials in environment variables.");
  process.exit(1); // Exit the process if critical env vars are missing
}

console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");

const app = express();

// Middleware
app.use(helmet()); // Adds security headers
app.use(morgan("dev")); // Logs requests in development mode

// CORS - Allow multiple origins dynamically
const allowedOrigins = [
  "http://localhost:5173", // Frontend dev
  "http://127.0.0.1:5173", 
  "https://your-production-domain.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow access from this origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use(express.json());  // Built-in body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/response", responseRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/meeting", meetingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/workout", workoutPlanRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/supplements", supplementRoutes);
app.use("/api/progress", progressRoutes);
app.use('/api/feedback', feedbackRoutes);  // Standardized API route

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
