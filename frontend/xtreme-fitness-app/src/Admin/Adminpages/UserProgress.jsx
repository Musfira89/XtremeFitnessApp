import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserProgress = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;
    setLoading(true);
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/progress/${selectedUserId}`);
        setProgressData(response.data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [selectedUserId]);

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Users Progress Tracking</h1>
      <p className="text-gray-500 dark:text-gray-400 text-md mb-6">Admin can view selected user's weekly progress.</p>
      
      {/* User Selection */}
      <div className="w-full max-w-md mb-8">
        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Select User</label>
        <select
          className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Choose a User</option>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName || user.name || "Unnamed User"}
              </option>
            ))
          ) : (
            <option disabled>Loading users...</option>
          )}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading progress data...</p>
      ) : (
        selectedUserId && progressData.length > 0 ? (
          <Graph progressData={progressData} />
        ) : (
          selectedUserId && <p className="text-center text-gray-500">No progress data available.</p>
        )
      )}
    </div>
  );
};

const Graph = ({ progressData }) => {
  const colors = {
    weight: "#EF4444", // Red
    hips: "#DC2626", // Dark Red
    chest: "#B91C1C", // Deep Red
    waist: "#7F1D1D", // Maroon
  };

  const weeks = progressData.map((_, index) => `Week ${index + 1}`);

  const lineChartData = {
    labels: weeks,
    datasets: [
      {
        label: "Weight (kg)",
        data: progressData.map((entry) => entry.weight ?? null),
        borderColor: colors.weight,
        backgroundColor: colors.weight,
        pointRadius: 4,
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Hips (cm)",
        data: progressData.map((entry) => entry.hips ?? null),
        borderColor: colors.hips,
        backgroundColor: colors.hips,
        pointRadius: 4,
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Chest (cm)",
        data: progressData.map((entry) => entry.chest ?? null),
        borderColor: colors.chest,
        backgroundColor: colors.chest,
        pointRadius: 4,
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Waist (cm)",
        data: progressData.map((entry) => entry.waist ?? null),
        borderColor: colors.waist,
        backgroundColor: colors.waist,
        pointRadius: 4,
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="h-96 w-full p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default UserProgress;
