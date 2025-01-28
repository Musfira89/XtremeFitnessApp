import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register the components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ProgressChart = () => {
  // Sample data for the progress chart
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"], // Example weeks
    datasets: [
      {
        label: "Weight (kg)",
        data: [80, 78, 76, 75, 74, 73], // Sample weight data
        borderColor: "darkred", // Dark red for weight line
        backgroundColor: "darkred", // Dark red background
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "darkred",
      },
      {
        label: "Waist (cm)",
        data: [85, 84, 83, 82, 81, 80], // Sample waist data
        borderColor: "black", // Black for waist line
        backgroundColor: "black",
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "black",
      },
      {
        label: "Arms (cm)",
        data: [30, 31, 32, 33, 34, 35], // Sample arms data
        borderColor: "red", // Red for arms line
        backgroundColor: "red",
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "red",
      },
      {
        label: "Chest (cm)",
        data: [95, 96, 97, 98, 99, 100], // Sample chest data
        borderColor: "white", // White for chest line
        backgroundColor: "white",
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "white",
      },
      {
        label: "Legs (cm)",
        data: [60, 61, 62, 63, 64, 65], // Sample legs data
        borderColor: "darkred", // Dark red for legs line
        backgroundColor: "darkred",
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "darkred",
      },
      {
        label: "Body Fat (%)",
        data: [25, 24, 23, 22, 21, 20], // Sample body fat data
        borderColor: "red", // Red for body fat line
        backgroundColor: "red",
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: "red",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "black", // Change legend text color to black for better contrast
        },
      },
      tooltip: {
        backgroundColor: "black", // Tooltip background color
        titleColor: "white", // Tooltip title color
        bodyColor: "white", // Tooltip body color
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black", // X-axis label color
        },
        grid: {
          color: "lightgray", // X-axis grid color (lighter for better visibility)
        },
      },
      y: {
        ticks: {
          color: "black", // Y-axis label color
        },
        grid: {
          color: "lightgray", // Y-axis grid color (lighter for better visibility)
        },
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-red-600 mb-6">Progress Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
