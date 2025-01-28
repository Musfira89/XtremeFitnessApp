import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import Bg from "../assets/LandingPageImg/service1.png";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const categories = [
  "Demographics",
  "Physical Activity",
  "Diet and Nutrition",
  "Health and Medical",
  "Fitness Goals",
];

const Questionnaire = () => {
  const [currentCategory, setCurrentCategory] = useState(0); // Track category
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track question within category
  const [questionsData, setQuestionsData] = useState([]); // Store questions of the current category
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]); // Store user's answers
  const [selectedOption, setSelectedOption] = useState(''); // To store selected option
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const category = categories[currentCategory];
        const response = await axios.get(
          `http://localhost:5000/api/question/${category}`
        );
        setQuestionsData(response.data); // Load questions for the category
        setLoading(false);
        setCurrentQuestion(0); // Reset question index for new category
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [currentCategory]);

  const handleNext = async () => {
    // Capture the answer for the current question
    const currentQuestionData = questionsData[currentQuestion];
    const answer = currentQuestionData.inputType === "text"
      ? document.getElementById(`question-${currentQuestion}`)?.value // Free text answer
      : currentQuestionData.options?.find(option => option.text === selectedOption)?.text; // Selected option answer

    // Add answer to the answers state
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: currentQuestionData._id,
        answer: answer,
      },
    ]);

    if (currentQuestion < questionsData.length - 1) {
      // Move to next question in the same category
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentCategory < categories.length - 1) {
      // Move to the next category if all questions in the current category are done
      setCurrentCategory((prev) => prev + 1);
    } else {
      // If all categories and questions are complete, save the responses and navigate
      try {
        await axios.post("http://localhost:5000/api/response/save", {
          userId: "userId_here", // Replace with actual user ID
          category: categories[currentCategory],
          answers,
        });

        // Show success toast
        toast.success("Response stored successfully!");

        // Navigate to payment page
        navigate("/payment");
      } catch (error) {
        console.error("Error saving responses:", error);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      // Move to previous question in the same category
      setCurrentQuestion((prev) => prev - 1);
    } else if (currentCategory > 0) {
      // Move to the previous category if on the first question of the current category
      setCurrentCategory((prev) => prev - 1);
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
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 w-full max-w-3xl px-6 py-10 bg-white bg-opacity-95 shadow-2xl rounded-xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Category {currentCategory + 1}/{categories.length}:{" "}
              {categories[currentCategory]}
            </h1>
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                style={{
                  width: `${((currentCategory + 1) / categories.length) * 100}%`,
                }}
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentCategory + 1) / categories.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Loading questions...</div>
          ) : (
            <motion.div
              className="bg-gray-50 rounded-xl p-8 shadow-lg"
              key={currentQuestion}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {questionsData.length ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    {questionsData[currentQuestion]?.questionText ||
                      "No question available"}
                  </h2>

                  {/* Show Guide if available */}
                  {questionsData[currentQuestion]?.guide && (
                    <p className="text-gray-700 mb-4">
                      {questionsData[currentQuestion].guide}
                    </p>
                  )}

                  {/* Show Options if available */}
                  {questionsData[currentQuestion]?.options &&
                    questionsData[currentQuestion].options.length > 0 && (
                      <div className="space-y-5">
                        {questionsData[currentQuestion].options.map(
                          (option, index) => (
                            <motion.label
                              key={index}
                              className="flex items-center space-x-4 cursor-pointer bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-red-500 transition"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <input
                                type="radio"
                                name={`question-${questionsData[currentQuestion]._id}`}
                                className="w-5 h-5 text-red-500 focus:ring-red-500"
                                onChange={() => setSelectedOption(option.text)}
                              />
                              <span className="text-gray-800 font-medium">
                                {option.text}
                              </span>
                            </motion.label>
                          )
                        )}
                      </div>
                    )}

                  {/* Show Free Text if inputType is 'text' */}
                  {questionsData[currentQuestion]?.inputType === "text" && (
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Your Answer
                      </label>
                      <input
                        type="text"
                        id={`question-${currentQuestion}`}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500">
                  No questions found.
                </div>
              )}
            </motion.div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentCategory === 0 && currentQuestion === 0}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg shadow-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition"
            >
              {currentCategory === categories.length - 1 &&
              currentQuestion === questionsData.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
  
  );
};

export default Questionnaire;
