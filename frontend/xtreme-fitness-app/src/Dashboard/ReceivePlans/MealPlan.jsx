import React from "react";

const MealPlan = () => {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 hover:shadow-2xl transform hover:scale-105 transition-all">
      <div className="flex items-center space-x-4">
        {/* Icon */}
        <div className="bg-red-600 text-white rounded-full p-4 shadow-lg">
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
        <h3 className="text-2xl font-extrabold text-red-600">Meal Plan</h3>
      </div>
      <p className="text-red-600 mt-4 text-lg">
        Receive your customized meal plan designed for your needs.
      </p>
    </div>
  );
};

export default MealPlan;
