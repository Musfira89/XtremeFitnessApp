import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaUser, FaRunning, FaAppleAlt, FaHeartbeat, FaDumbbell } from "react-icons/fa";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const QuestionResponse = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [weekNumber, setWeekNumber] = useState("");
  const [availableWeeks, setAvailableWeeks] = useState([]); // Store available weeks dynamically
  const [userResponses, setUserResponses] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch available weeks for the selected user
  const fetchAvailableWeeks = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/response/weeks/${userId}`);
      setAvailableWeeks(response.data.weeks); // Extract weeks array
      console.log("Weeks Data:", response.data.weeks);
    } catch (error) {
      console.error("Error fetching available weeks:", error);
      setAvailableWeeks([]);
    }
  };
  
  const fetchUserResponses = useCallback(async (userId, category, week) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/response/${userId}/${category}/${week}`);
      setUserResponses((prevResponses) => ({
        ...prevResponses,
        [category]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching user responses:", error);
    }
  }, []);

  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
      if (selectedUserId && weekNumber) {
        fetchUserResponses(selectedUserId, category, weekNumber);
      }
    }
  };

  const handleUserSelect = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId || null);
    setExpandedCategory(null);
    setUserResponses({});
    setWeekNumber("");
    if (userId) {
      fetchAvailableWeeks(userId); // Fetch weeks dynamically when user is selected
    } else {
      setAvailableWeeks([]); // Reset if no user is selected
    }
  };

  const handleWeekSelect = (e) => {
    setWeekNumber(e.target.value);
    setUserResponses({});
    setExpandedCategory(null);
  };

  const categoryIcons = {
    Demographics: <FaUser className="text-white text-2xl" />,
    "Physical Activity": <FaRunning className="text-white text-2xl" />,
    "Diet and Nutrition": <FaAppleAlt className="text-white text-2xl" />,
    "Health and Medical": <FaHeartbeat className="text-white text-2xl" />,
    "Fitness Goals": <FaDumbbell className="text-white text-2xl" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
   <motion.h1
  className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-4 text-left"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  User Health Questionnaire Responses
</motion.h1>

      {/* Select User */}
      <motion.div className="mb-6 max-w-md text-left" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <label className="block text-gray-700 font-medium mb-2">Select User</label>
        <select value={selectedUserId || ""} onChange={handleUserSelect} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">Choose a user...</option>
          {userData.map((user) => (
            <option key={user._id} value={user._id}>{user.fullName}</option>
          ))}
        </select>
      </motion.div>

      {/* Select Week */}
      {selectedUserId && (
        <motion.div className="mb-6 max-w-md text-left" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <label className="block text-gray-700 font-medium mb-2">Select Week</label>
          <select value={weekNumber} onChange={handleWeekSelect} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Choose a week...</option>
            {availableWeeks.length > 0 ? (
              availableWeeks.map((week) => (
                <option key={week} value={week}>Week {week}</option>
              ))
            ) : (
              <option disabled>No weeks available</option>
            )}
          </select>
        </motion.div>
      )}

      {/* Response Sections */}
      {selectedUserId && weekNumber && (
        <motion.div className="flex flex-col gap-4 max-w-5xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {["Demographics", "Physical Activity", "Diet and Nutrition", "Health and Medical", "Fitness Goals"].map((category, index) => (
            <motion.div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCategory(category)}>
                <div className="flex items-center space-x-3">
                  <div className="bg-red-500 p-3 rounded-full">{categoryIcons[category]}</div>
                  <h3 className="text-xl font-bold text-gray-800">{category}</h3>
                </div>
                {expandedCategory === category ? <ExpandLessIcon className="text-gray-500" /> : <ExpandMoreIcon className="text-gray-500" />}
              </div>
              {expandedCategory === category && userResponses[category] && (
                <ul className="mt-4 space-y-2">
                  {userResponses[category].map((response, idx) => (
                    <li key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
                      <p className="text-sm text-gray-600 font-bold pb-3">{response.questionText}</p>
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
