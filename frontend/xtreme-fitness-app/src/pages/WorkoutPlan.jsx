import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

const WorkoutPlan = () => {
  const { userId } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch workout plan from the API
  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/generate-workout-plan/${userId}`);
        setWorkoutPlan(response.data.workoutPlan);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
        setLoading(false);
      }
    };
    fetchWorkoutPlan();
  }, [userId]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800">Loading Your Workout Plan...</h2>
      </div>
    );
  }

  return (
    <section className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg max-w-6xl mx-auto">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Your Workout Plan</h2>
        <p className="text-lg text-gray-600 mt-2">
          Stay consistent and achieve your fitness goals with this personalized plan.
        </p>
        {/* Display workout split and fitness goal */}
        <div className="mt-4 text-xl font-medium text-gray-700">
          <p><strong>Workout Split:</strong> {workoutPlan[0]?.workoutSplit}</p>
          <p><strong>Fitness Goal:</strong> {workoutPlan[0]?.fitnessGoal}</p>
          <p><strong>Cardio Frequency:</strong> {workoutPlan[0]?.cardioFrequency}</p>
          <p><strong>Cardio Duration:</strong> {workoutPlan[0]?.cardioDuration}</p>
        </div>
      </header>

      {/* Day-Wise Routine */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutPlan.map((day, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            {/* Day and Workout */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{day.day}</h3>
            <p className="text-gray-600 mb-4">{day.exercise}</p>

            {/* Video Section */}
            <a
              href={day.videoLink}
              className="flex items-center space-x-2 text-red-600 font-medium hover:underline"
            >
              <FaPlayCircle className="text-2xl" />
              <span>Watch: How to Perform {day.exercise.split(" ")[0]}</span>
            </a>

            {/* CTA: Start Today's Workout */}
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              onClick={() => alert(`Starting ${day.day}'s workout!`)}
            >
              Start Today's Workout
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkoutPlan;
