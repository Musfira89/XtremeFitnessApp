import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Table } from "flowbite-react";

const Progress = ({ userId }) => {
  const [responses, setResponses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Physical Activity"); // Default category

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/progress/${userId}/${selectedCategory}`);
        setResponses(response.data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };

    fetchResponses();
  }, [userId, selectedCategory]);

  // Prepare chart data
  const chartData = {
    labels: responses.map((entry) => entry.questionText),
    datasets: [
      {
        label: selectedCategory,
        data: responses.map((entry) => entry.score),
        fill: false,
        borderColor: "#4CAF50",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Progress Tracking</h2>

      {/* Category Selection */}
      <div className="mb-4">
        <label className="block text-gray-700">Select Category:</label>
        <select
          className="border rounded p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Demographics">Demographics</option>
          <option value="Physical Activity">Physical Activity</option>
          <option value="Diet and Nutrition">Diet and Nutrition</option>
          <option value="Health and Medical">Health and Medical</option>
          <option value="Fitness Goals">Fitness Goals</option>
        </select>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6">
        <Line data={chartData} />
      </div>

      {/* Progress Table */}
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Question</Table.HeadCell>
          <Table.HeadCell>Answer</Table.HeadCell>
          <Table.HeadCell>Score</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {responses.map((response, index) => (
            <Table.Row key={index}>
              <Table.Cell>{response.questionText}</Table.Cell>
              <Table.Cell>{response.answer}</Table.Cell>
              <Table.Cell>{response.score}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Re-Assessment Button */}
      <div className="mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.location.href = "/assessment"}
        >
          Re-Assess Now
        </button>
      </div>
    </div>
  );
};

export default Progress;
