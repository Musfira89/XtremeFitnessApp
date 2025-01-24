import { useState } from "react";
import { questionsData } from "./questionsData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Bg from '../assets/fitness_1.jpg';

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const navigate = useNavigate(); // Initialize useNavigate

  const totalSteps = questionsData.length;
  const currentStepData = questionsData[currentStep];
  const currentQuestion = currentStepData.questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < currentStepData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Navigate to /payment after the last question in the last step
      navigate("/payment");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setCurrentQuestionIndex(
        questionsData[currentStep - 1].questions.length - 1
      );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 overflow-hidden"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-0"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-3xl px-6 py-10 bg-white bg-opacity-95 shadow-2xl rounded-xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Step {currentStep + 1}/{totalSteps}: {currentStepData.title}
          </h1>
          <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
              style={{
                width: `${((currentStep + currentQuestionIndex / currentStepData.questions.length) / totalSteps) * 100}%`,
              }}
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + currentQuestionIndex / currentStepData.questions.length) / totalSteps) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          className="bg-gray-50 rounded-xl p-8 shadow-lg"
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-5">
            {currentQuestion.options.map((option, index) => (
              <motion.label
                key={index}
                className="flex items-center space-x-4 cursor-pointer bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-red-500 transition"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  className="w-5 h-5 text-red-500 focus:ring-red-500"
                />
                <span className="text-gray-800 font-medium">{option}</span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0 && currentQuestionIndex === 0}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg shadow-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition"
          >
            {currentStep === totalSteps - 1 &&
            currentQuestionIndex === currentStepData.questions.length - 1
              ? "Finish"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
