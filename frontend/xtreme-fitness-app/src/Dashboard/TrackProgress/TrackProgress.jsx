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
  // Data for the chart (Meals and Workouts)
  const data = {
    labels: ["Mon", "Tue", "Wed"], // Labels for each day of the week
    datasets: [
      {
        label: "Meals",
        data: [3, 4, 2], // Number of meals consumed each day
        backgroundColor: "rgba(208, 49, 45, 0.8)", // Red color for meals (new color)
      },
      {
        label: "Workouts",
        data: [30, 45, 40], // Minutes of workouts each day
        backgroundColor: "rgb(220, 38, 38", // Another shade of red for workouts
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Legend at the top
        labels: {
          color: "#000000", // Black text for legend
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            // Tooltip showing value with unit (m for minutes or meals)
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} ${
              tooltipItem.dataset.label === "Meals" ? "meals" : "minutes"
            }`;
          },
        },
        backgroundColor: "#333333", // Dark tooltip background
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "#000000", // Black tick labels
        },
        grid: {
          display: false, // Remove grid lines on X-axis
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "#000000", // Black tick labels
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Light gray grid lines
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-full mx-auto">
      <h3 className="text-2xl font-bold text-black">Progress Tracking</h3>
      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-4xl">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TrackProgress;
