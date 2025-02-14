import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Graph from "../pages/Progress/Graph";

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/progress/${userId}`
        );
        setProgressData(response.data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgress();
  }, [userId]);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
        maxWidth: "800px",
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
        Progress Tracking
      </h1>
      {/* Subtext */}
      <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
        Monitor your progress over time.
      </p>

      {/* Graph Component */}
      <Graph progressData={progressData} />
    </div>
  );
};

export default Progress;
