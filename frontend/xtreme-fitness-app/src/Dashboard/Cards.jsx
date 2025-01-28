import React from "react";

const FinalCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Meal Plan Card */}
      <div className="bg-white rounded-lg shadow-2xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all">
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
          <h3 className="text-xl font-extrabold text-red-600">Meal Plan</h3>
        </div>
        <p className="text-red-600 mt-4 text-md">
          Receive your customized meal plan designed for your needs.
        </p>
        <div className="mt-4">
          <button className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-500 transition-all">
            View Weekly Plan
          </button>
        </div>
      </div>

      {/* Workout Plan Card */}
      <div className="bg-gradient-to-r from-red-400 to-red-600 rounded-lg shadow-2xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all">
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
          <h3 className="text-xl font-extrabold text-white">Workout Plan</h3>
        </div>
        <p className="text-white mt-4 text-md">
          Get access to a tailored workout plan to achieve your fitness goals.
        </p>
        <div className="mt-4">
          <button className="bg-white text-red-600 px-5 py-2 rounded-full hover:bg-red-100 transition-all">
            Start Today's Workout
          </button>
        </div>
      </div>

    
    </div>
  );
};

export default FinalCard;
