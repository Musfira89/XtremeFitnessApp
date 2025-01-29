import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";
import axios from "axios"; // For API calls

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const Analytics = () => {
  // State for analytics data
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data from the backend
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/admin/analytics"); // Replace with your API endpoint
        setAnalyticsData(response.data); // Example: { signedIn: 65, notSignedIn: 35 }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Display loading state
  if (loading) {
    return <div className="text-center text-gray-600">Loading analytics...</div>;
  }

  // Display error state
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Prepare the data for the chart
  const data = {
    labels: ["Signed In", "Not Signed In"],
    datasets: [
      {
        data: [analyticsData.signedIn, analyticsData.notSignedIn], // Dynamic data
        backgroundColor: [
          "rgb(34, 197, 94)", // Green for Signed In
          "rgb(220, 38, 38)", // Red for Not Signed In
        ],
        borderColor: "rgb(220, 38, 38)", // Border color for segments
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "User Sign-in Analytics",
        font: {
          size: 18,
        },
        color: "#333", // Dark text for title
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark tooltip background
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return (
    <div className="w-full p-8 bg-white rounded-xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 tracking-wide">User Sign-in Analytics</h3>
      <div className="w-full" style={{ height: "250px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Analytics;
