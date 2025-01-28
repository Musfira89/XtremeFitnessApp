// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './mongoConnect.js';  // DB connection
import authRoutes from './routes/auth.js';
import questionRoutes from "./routes/question.js";
import responseRoutes from "./routes/response.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Your frontend's URL
  methods: ["GET", "POST"],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/question", questionRoutes); // For questions
app.use("/api/response", responseRoutes); // For responses
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
