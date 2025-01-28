// models/Response.js

import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: String,
    enum: [
      "Demographics",
      "Physical Activity",
      "Diet and Nutrition",
      "Health and Medical Factors",
      "Fitness Goals",
    ],
    required: true,
  },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
      answer: { type: mongoose.Schema.Types.Mixed, required: true }, // Can handle multiple input types
    },
  ],
});

const Response = mongoose.model("Response", responseSchema);
export default Response;
