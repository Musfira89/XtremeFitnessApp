import React, { useState, useEffect } from "react";
import { FaUser, FaRunning, FaAppleAlt, FaHeartbeat, FaDumbbell } from "react-icons/fa";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const QuestionResponse = () => {
  const users = ["Arees", "Sara", "John"];

  const responses = {
    "Arees": {
      Demographics: [
        { question: "Age", answer: "25" },
        { question: "Gender", answer: "Male" },
      ],
      "Physical Activity": [
        { question: "Do you exercise?", answer: "Yes" },
        { question: "How often?", answer: "3 times a week" },
      ],
      "Diet and Nutrition": [
        { question: "Vegetarian?", answer: "No" },
        { question: "Daily water intake?", answer: "2 liters" },
      ],
      "Health and Medical": [
        { question: "Any allergies?", answer: "None" },
        { question: "Chronic illnesses?", answer: "No" },
      ],
      "Fitness Goals": [
        { question: "Goal?", answer: "Lose weight" },
        { question: "Timeline?", answer: "6 months" },
      ],
    },
  };

  const [selectedUser, setSelectedUser] = useState("");
  const [userResponses, setUserResponses] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      setUserResponses(responses[selectedUser] || {});
    }
  }, [selectedUser]);

  const categoryIcons = {
    Demographics: <FaUser className="text-white text-2xl" />,
    "Physical Activity": <FaRunning className="text-white text-2xl" />,
    "Diet and Nutrition": <FaAppleAlt className="text-white text-2xl" />,
    "Health and Medical": <FaHeartbeat className="text-white text-2xl" />,
    "Fitness Goals": <FaDumbbell className="text-white text-2xl" />,
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Admin Info */}
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-4 mb-6 max-w-3xl">
        <p className="text-sm font-medium">
          <strong>Admin Info:</strong> Select a user to view their responses in different categories. Click on a category to expand and see the answers.
        </p>
      </div>

      {/* Heading */}
      <motion.h1
        className="text-3xl font-bold text-red-600 mb-4 text-left"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Health Questionnaire Responses
      </motion.h1>

      {/* User Dropdown */}
      <motion.div
        className="mb-6 max-w-md text-left"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-gray-700 font-medium mb-2">Select User</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Choose a user...</option>
          {users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Response Categories - Two in a Row */}
      {selectedUser && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {Object.entries(userResponses).map(([category, questions], index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-red-500 p-3 rounded-full">
                    {categoryIcons[category]}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{category}</h3>
                </div>
                {expandedCategory === category ? (
                  <ExpandLessIcon className="text-gray-500" />
                ) : (
                  <ExpandMoreIcon className="text-gray-500" />
                )}
              </div>

              {expandedCategory === category && (
                <ul className="mt-4 space-y-2">
                  {questions.map((item, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-100 p-4 rounded-lg border-l-4 border-red-400 shadow-sm"
                    >
                      <p className="text-sm font-medium text-gray-600">{item.question}</p>
                      <p className="text-lg text-gray-800">{item.answer}</p>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default QuestionResponse;
