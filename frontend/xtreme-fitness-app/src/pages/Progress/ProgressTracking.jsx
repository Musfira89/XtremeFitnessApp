import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Graph from "./Graph";
import Table from "./Table";

const ProgressTracking = () => {
  const [progressData, setProgressData] = useState([]);
  const [isEligible, setIsEligible] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/progress/${userId}`);
        setProgressData(response.data);
      } catch (error) {
        console.error("Error fetching progress data:", error.response ? error.response.data : error);
      }
    };

    const checkEligibility = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/eligibility/${userId}`);
        setIsEligible(response.data.eligible);

        if (!response.data.eligible && response.data.lastSubmission) {
          startCountdown(response.data.lastSubmission);
        }
      } catch (error) {
        console.error("Error checking eligibility:", error.response ? error.response.data : error);
      }
    };

    fetchProgress();
    checkEligibility();
  }, [userId]);

  useEffect(() => {
    let interval;

    if (!isEligible && timeLeft !== "You can take the next assessment now!") {
      interval = setInterval(() => {
        updateTimer();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeLeft, isEligible]);

  const startCountdown = (lastSubmissionDate) => {
    const lastSubmissionTime = new Date(lastSubmissionDate).getTime();
    const oneWeekLater = lastSubmissionTime + 7 * 24 * 60 * 60 * 1000;

    const updateTimer = () => {
      const now = new Date().getTime();
      if (now >= oneWeekLater) {
        setTimeLeft("You can take the next assessment now!");
        setIsEligible(true);
        return;
      }

      const diff = oneWeekLater - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
  };

  return (
    <div className="bg-white min-h-screen p-4 sm:p-8">
      {/* Heading */}
      <div className="text-center mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Progress Tracking</h1>
        <p className="text-gray-500 text-sm sm:text-base">Monitor your progress and take weekly assessments.</p>
      </div>

      {/* Next Week Assessment Button */}
      <div className="mb-12 sm:mb-16">
        <button
          onClick={() => navigate(`/questions/${userId}`)}
          disabled={!isEligible}
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-semibold transition ${
            isEligible
              ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Next Week Assessment
        </button>

        {!isEligible && (
          <div className="mt-2 text-center">
            <p className="text-red-500 text-xs sm:text-sm font-bold">You can take the next assessment after one week.</p>
            <hr className="my-2 border-gray-300" />
          </div>
        )}
      </div>

      {/* Full-width Graph */}
      <div className="mb-8 w-full">
        <Graph progressData={progressData} />
      </div>

      {/* Table with responsive scrolling */}
      <div className="overflow-x-auto w-full">
        <Table progressData={progressData} />
      </div>
    </div>
  );
};

export default ProgressTracking;
