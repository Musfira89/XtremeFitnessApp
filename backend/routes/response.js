// routes/response.js

import express from "express";
import  saveResponses  from "../controllers/response.js";

const router = express.Router();

// Save user responses
router.post("/save", saveResponses);

export default router;
