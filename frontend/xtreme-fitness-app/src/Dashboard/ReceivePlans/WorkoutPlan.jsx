import React from "react";

const WorkoutPlan = () => {
  return (
    <div className="bg-gradient-to-r from-red-400 to-red-600 rounded-lg shadow-2xl p-8 hover:shadow-2xl transform hover:scale-105 transition-all">
      <div className="flex items-center space-x-4">
        {/* Icon */}
        <div className="bg-white text-red-600 rounded-full p-4 shadow-lg">
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
        <h3 className="text-2xl font-extrabold text-white">Workout Plan</h3>
      </div>
      <p className="text-white mt-4 text-lg">
        Get access to a tailored workout plan to achieve your fitness goals.
      </p>
    </div>
  );
};

export default WorkoutPlan;
