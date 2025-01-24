import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register the required Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const Analytics = () => {
  // Example data for the number of users signed in and some other analytics
  const data = {
    labels: ["Signed In", "Not Signed In"], // Two segments: Signed In and Not Signed In
    datasets: [
      {
        data: [65, 35], // Example data
        backgroundColor: [
          "rgb(220, 38, 38)", // Dark red color for Signed In
          "rgb(255, 99, 132)", // Light red for Not Signed In
        ],
        borderColor: "rgb(220, 38, 38)", // Border color matching the red
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
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background for tooltip
        titleColor: "#fff", // White title in tooltip
        bodyColor: "#fff", // White body in tooltip
      },
    },
    // Size adjustments: make chart smaller
    maintainAspectRatio: false,
    aspectRatio: 1, // This will maintain a square shape for the pie chart
  };

  return (
    <div className="w-full p-8 bg-white rounded-xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 tracking-wide">User Sign-in Analytics</h3>
      <div className="w-full" style={{ height: '250px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Analytics;
