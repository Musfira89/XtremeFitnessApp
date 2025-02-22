import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import axios from "axios";
import { motion } from "framer-motion";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { date, count } = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-3 shadow-lg rounded-md border border-gray-700 backdrop-blur-md bg-opacity-60 text-sm">
        <p className="font-semibold">{date}</p>
        <p className="text-blue-400 font-bold">Trial Users: {count}</p>
      </div>
    );
  }
  return null;
};

const TrialUsersGraph = () => {
  const [trialData, setTrialData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrialData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/trial-users`);
    
        console.log("API Response:", response.data); // Debugging
    
        const trialUsersArray = Array.isArray(response.data) ? response.data : [];
    
        if (trialUsersArray.length === 0) {
          console.log("No trial users found!");
        }
    
        let formattedData = trialUsersArray.map((item, index) => ({
          date: item._id,
          count: item.count,
          animationDelay: index * 0.1,
        }));
    
        setTrialData(formattedData);
      } catch (error) {
        console.error("Error fetching trial users data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    
    
    fetchTrialData();
  }, []);
  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 backdrop-blur-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">Trial Users</h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : trialData.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold">No Trial Users</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={trialData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#666" }} />
            <YAxis tick={{ fontSize: 16, fill: "#333", fontWeight: "bold" }} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#007bff", strokeWidth: 2 }} />
            <Line type="monotone" dataKey="count" stroke="#007bff" strokeWidth={3} dot={{ fill: "#007bff", r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

export default TrialUsersGraph;
