import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import Bg from "../assets/LandingPageImg/service1.png";

const categories = [
  "Demographics",
  "Physical Activity",
  "Diet and Nutrition",
  "Health and Medical",
  "Fitness Goals",
];

const Questionnaire = () => {
  const { userId } = useParams();
  const [currentCategory, setCurrentCategory] = useState(0); // Track current category
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
  const [questionsData, setQuestionsData] = useState([]); // Questions of the current category
  const [answers, setAnswers] = useState([]); // Store user's answers
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Track selected option
  const navigate = useNavigate();

  // Fetch questions for the current category
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const category = categories[currentCategory];
        const response = await axios.get(
          `http://localhost:5000/api/question/${category}`
        );
        setQuestionsData(response.data); // Set the questions
        setCurrentQuestion(0); // Reset question index
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [currentCategory]);

  Date.prototype.getWeekNumber = function () {
    const startOfYear = new Date(this.getFullYear(), 0, 1);
    const pastDays = (this - startOfYear) / 86400000;
    return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
  };

  const handleNext = async () => {
    const currentQuestionData = questionsData[currentQuestion];

    // Validate selection
    const answer =
      currentQuestionData.inputType === "text"
        ? document.getElementById(`question-${currentQuestion}`)?.value
        : selectedOption;

    if (!answer) {
      toast.error("Please select an option before proceeding.");
      return;
    }

    const updatedAnswers = [
      ...answers,
      {
        questionId: currentQuestionData._id,
        questionText: currentQuestionData.questionText,
        answer,
      },
    ];
    setAnswers(updatedAnswers);

    if (currentQuestion === questionsData.length - 1) {
      try {
        const payload = {
          userId: userId,
          category: categories[currentCategory],
          answers: updatedAnswers,
          weekNumber: new Date().getWeekNumber(),
        };

        await axios.post("http://localhost:5000/api/response/save", payload);

        if (currentCategory < categories.length - 1) {
          setCurrentCategory((prev) => prev + 1);
          setAnswers([]);
          setSelectedOption(""); // Reset selected option for new category
        } else {
          await axios.put(
            `http://localhost:5000/api/auth/mark-complete/${userId}`
          );
          toast.success("Responses saved successfully!");
          navigate(`/planpage/${userId}`);
        }
      } catch (error) {
        console.error(
          "Error saving responses:",
          error.response || error.message
        );
        toast.error("Failed to save responses. Please try again.");
      }
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(""); // Reset selected option for the next question
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
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md z-0"></div>

      <div className="relative z-10 w-full max-w-3xl px-8 py-12 bg-white bg-opacity-90 shadow-2xl rounded-2xl">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-800 text-center mb-6 tracking-wide leading-tight drop-shadow-md">
            Category {currentCategory + 1}/{categories.length}:{" "}
            {categories[currentCategory]}
          </h1>

          <div className="relative w-full h-4 bg-gray-300 rounded-md overflow-hidden">
            <motion.div
              className="absolute h-4 bg-gradient-to-r from-red-600 to-pink-700 rounded-full"
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
          <div className="text-center text-gray-500 text-lg">
            Loading questions...
          </div>
        ) : (
          <motion.div
            className="bg-gray-100 rounded-2xl p-8 shadow-lg"
            key={currentQuestion}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {questionsData.length ? (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 text-left">
                  {questionsData[currentQuestion]?.questionText ||
                    "No question available"}
                </h2>

                {questionsData[currentQuestion]?.guide && (
                  <p className="text-gray-700 mb-6 text-left">
                    {questionsData[currentQuestion].guide}
                  </p>
                )}

                {questionsData[currentQuestion]?.options?.length > 0 && (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {questionsData[currentQuestion].options.map(
                      (option, index) => (
                        <motion.label
                          key={index}
                          className="flex items-center space-x-4 cursor-pointer bg-white p-5 rounded-xl shadow-lg border border-gray-200 transition hover:shadow-xl hover:border-red-300"
                          whileTap={{ scale: 0.98 }}
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

                {questionsData[currentQuestion]?.inputType === "text" && (
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Answer
                    </label>
                    <input
                      type="text"
                      id={`question-${currentQuestion}`}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-500 text-lg">
                No questions found.
              </div>
            )}
          </motion.div>
        )}

        <div className="flex justify-between mt-10">
          <button
            onClick={handleBack}
            disabled={currentCategory === 0 && currentQuestion === 0}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg shadow-md transition hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-3 rounded-lg shadow-lg hover:from-red-500 hover:to-pink-500 transition"
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
