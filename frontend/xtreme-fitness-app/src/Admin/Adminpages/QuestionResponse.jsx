import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaRunning, FaAppleAlt, FaHeartbeat, FaDumbbell } from "react-icons/fa";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const QuestionResponse = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);  // Set to null initially
  const [userResponses, setUserResponses] = useState({});  // Store responses by category
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/users");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch responses for selected user and category
  const fetchUserResponses = async (userId, category) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/response/${userId}/${category}`);
      setUserResponses((prevResponses) => ({
        ...prevResponses,
        [category]: response.data
      }));
    } catch (error) {
      console.error("Error fetching user responses:", error);
    }
  };
  
  // Handle category click to expand responses
  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
      if (selectedUser) {
        fetchUserResponses(selectedUser._id, category);
      }
    }
  };

  // Handle user selection
  const handleUserSelect = (e) => {
    const userName = e.target.value;
    const user = userData.find(user => user.fullName === userName);
    setSelectedUser(user || null);
    setExpandedCategory(null);  // Reset the expanded category
    setUserResponses({}); // Reset the responses when a new user is selected
  };

  const categoryIcons = {
    Demographics: <FaUser className="text-white text-2xl" />,
    "Physical Activity": <FaRunning className="text-white text-2xl" />,
    "Diet and Nutrition": <FaAppleAlt className="text-white text-2xl" />,
    "Health and Medical": <FaHeartbeat className="text-white text-2xl" />,
    "Fitness Goals": <FaDumbbell className="text-white text-2xl" />,
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Reset user responses when user is selected
      setUserResponses({});
    }
  }, [selectedUser]);

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
          value={selectedUser?.fullName || ""}
          onChange={handleUserSelect}
          className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Choose a user...</option>
          {userData.map((user) => (
            <option key={user._id} value={user.fullName}>
              {user.fullName}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Response Categories - Two in a Row */}
{/* Response Categories - One in a Row */}
{selectedUser && (
  <motion.div
    className="flex flex-col gap-4 max-w-5xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    {["Demographics", "Physical Activity", "Diet and Nutrition", "Health and Medical", "Fitness Goals"].map((category, index) => (
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

        {expandedCategory === category && userResponses[category] && (
          <ul className="mt-4 space-y-2">
            {userResponses[category].map((response, idx) => (
              <li
                key={idx}
                className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500 shadow-sm"
              >
                <p className="text-sm  text-gray-600 font-bold pb-3">{response.questionText}</p>
                <p className="text-sm text-gray-800">{response.answer}</p>
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
