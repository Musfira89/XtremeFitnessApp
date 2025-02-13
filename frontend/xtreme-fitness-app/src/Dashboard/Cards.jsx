import React from "react";
import { useParams } from "react-router-dom";

const FinalCard = () => {
  const { userId } = useParams();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 md:p-6">
      {/* Meal Plan Card */}
      <div className="relative bg-white border border-gray-300 rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all">
        {/* Header */}
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <div className="bg-red-700 text-white rounded-xl p-3 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 10.75a8.5 8.5 0 11-16.5 0 8.5 8.5 0 0116.5 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-black">
            Meal Plan
          </h3>
        </div>

        {/* Content */}
        <p className="text-gray-700 mt-3 text-sm md:text-lg">
          Receive a personalized meal plan tailored to your needs.
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <a
            href={`/dashboard/${userId}/mealPlan`}
            className="block text-center bg-red-700 text-white px-4 py-2 md:px-5 md:py-3 rounded-lg hover:bg-red-600 transition-all font-medium shadow-md"
          >
            View Weekly Plan
          </a>
        </div>
      </div>

      {/* Workout Plan Card */}
      <div className="relative bg-gradient-to-b from-red-600 to-red-800 border border-gray-700 rounded-xl shadow-xl p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all">
        {/* Header */}
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <div className="bg-white text-red-700 rounded-xl p-3 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.25 9.25L8.75 16.75M9 11.5h6m-3 0v5"
              />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            Workout Plan
          </h3>
        </div>

        {/* Content */}
        <p className="text-gray-200 mt-3 text-sm md:text-lg">
          Follow a structured workout plan designed for your fitness goals.
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <a
            href={`/dashboard/${userId}/workoutPlan`}
            className="block text-center bg-white text-red-700 px-4 py-2 md:px-5 md:py-3 rounded-lg hover:bg-gray-100 transition-all font-medium shadow-md"
          >
            Start Today's Workout
          </a>
        </div>
      </div>
    </div>
  );
};

export default FinalCard;
