import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: [
      "Demographics",
      "Physical Activity",
      "Diet and Nutrition",
      "Health and Medical",
      "Fitness Goals",
    ],
    required: true,
  },
  questionText: { type: String, required: true },
  guide: { type: String, default: "" }, // Optional guide for additional instructions
  options: [optionSchema], // Multiple choice options
  inputType: {
    type: String,
    enum: ["text", "radio", "checkbox", "select"],
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
