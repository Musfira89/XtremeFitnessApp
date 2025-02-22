import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";

const COLORS = ["#D32F2F", "#FF5252", "#B71C1C", "#757575", "#212121", "#9E9E9E", "#F5F5F5"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { date, users } = payload[0].payload;
    return (
      <div className="bg-white text-black p-3 shadow-md rounded-md border border-gray-300 text-sm">
        <p className="font-semibold">{date}</p>
        <p>
          Total Users: <span className="font-bold">{users}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center space-x-4 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-gray-700 font-medium text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const TotalUsers = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/total-users`);
        const formattedData = response.data.map((item, index) => ({
          date: new Date(item._id + "-01").toLocaleString("default", {
            month: "short",
            year: "numeric",
          }),
          users: item.count,
          color: COLORS[index % COLORS.length],
        }));

        setUserData(formattedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center">
      {/* Heading with Inter font */}
      <h3
        className="text-2xl font-semibold text-gray-600 "
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        User Growth Over Time .
      </h3>
      <div className="w-full h-1 bg-gray-200 mt-2 mb-5"></div>{" "}

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          {/* Define Gradient Colors */}
          <defs>
            {userData.map((entry, index) => (
              <linearGradient key={index} id={`grad${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={entry.color} stopOpacity={0.7} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={1} />
              </linearGradient>
            ))}
          </defs>

          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={userData}
            dataKey="users"
            nameKey="date"
            cx="50%"
            cy="50%"
            outerRadius={140}
            innerRadius={85}
            paddingAngle={5}
            isAnimationActive={true}
            label={({ date }) => date}
          >
            {userData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#grad${index})`} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <CustomLegend payload={userData.map((item) => ({ value: item.date, color: item.color }))} />
    </div>
  );
};

export default TotalUsers;
