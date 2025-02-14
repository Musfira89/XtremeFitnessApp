import React from "react";
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

const Graph = ({ progressData }) => {
  const colors = {
    weight: "#EF4444", // Red
    hips: "#DC2626", // Dark Red
    chest: "#B91C1C", // Deep Red
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
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 mb-6">
      <div className="h-96 w-full">
        <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default Graph;
