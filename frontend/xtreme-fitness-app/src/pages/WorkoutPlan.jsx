import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const WorkoutPlan = () => {
  const days = [
    { day: "Monday", workout: "Full Body Strength", video: "link-to-video" },
    { day: "Tuesday", workout: "Cardio and Core", video: "link-to-video" },
    { day: "Wednesday", workout: "Upper Body Strength", video: "link-to-video" },
    { day: "Thursday", workout: "Yoga and Stretching", video: "link-to-video" },
    { day: "Friday", workout: "Lower Body Strength", video: "link-to-video" },
    { day: "Saturday", workout: "HIIT Training", video: "link-to-video" },
    { day: "Sunday", workout: "Active Rest", video: "link-to-video" },
  ];

  return (
    <section className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg max-w-6xl mx-auto">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Your Workout Plan</h2>
        <p className="text-lg text-gray-600 mt-2">
          Stay consistent and achieve your fitness goals with this personalized plan.
        </p>
      </header>

      {/* Day-Wise Routine */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            {/* Day and Workout */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{day.day}</h3>
            <p className="text-gray-600 mb-4">{day.workout}</p>

            {/* Video Section */}
            <a
              href={day.video}
              className="flex items-center space-x-2 text-red-600 font-medium hover:underline"
            >
              <FaPlayCircle className="text-2xl" />
              <span>Watch: How to Perform {day.workout.split(" ")[0]}</span>
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
