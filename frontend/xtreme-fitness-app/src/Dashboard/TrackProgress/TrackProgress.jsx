import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TrackProgress = () => {
  // Data for the bar chart with dark red (mahroon) color and no border on bars
  const data = {
    labels: ["Meals Consumed", "Workouts Completed", "Weight Target Achieved"],
    datasets: [
      {
        label: "Progress",
        data: [75, 50, 90], // Progress in percentage
        backgroundColor: [
          "rgba(128, 0, 0, 0.8)", // Mahroon
          "rgba(139, 0, 0, 0.8)", // Dark Red (Mahroon)
          "rgba(139, 0, 0, 0.6)", // Light Mahroon
        ],
        hoverBackgroundColor: [
          "rgba(128, 0, 0, 1)",
          "rgba(139, 0, 0, 1)",
          "rgba(139, 0, 0, 0.8)",
        ],
        borderWidth: 0, // Remove border
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#000000", // Black labels for light theme
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333333", // Dark tooltip background
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000000", // Black tick labels
        },
      },
      y: {
        ticks: {
          color: "#000000", // Black tick labels
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-full mx-auto">
      <h3 className="text-2xl font-bold text-black">Track Progress</h3>
      <p className="text-gray-600 mt-2">
        View your progress for meals, workouts, and weight goals.
      </p>
      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-xl">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TrackProgress;
