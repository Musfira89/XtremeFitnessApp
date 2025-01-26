import React from "react";
import workoutImage from "../../assets/Workout.png"; // Replace with your image path

const WorkoutSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center  px-6 py-12 mt-20 mb-10">
      {/* Left Section - Image */}
      <div className="md:w-1/2 w-full relative">
        <img
          src={workoutImage}
          alt="Workout"
          className="w-full h-auto object-cover clip-shape"
        />
        <style jsx>{`
          .clip-shape {
            clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
          }
        `}</style>
      </div>

  {/* Right Section - Text */}
  <div className="md:w-1/2 w-full flex flex-col justify-center items-center px-8">
        <div className="w-full max-w-lg">
          <h1 className="text-5xl font-extrabold text-red-800 mb-8">
            Customized Workout Plans
          </h1>
          <p className="text-gray-700 mb-6">
            Achieve your fitness goals with personalized workout plans tailored
            specifically to your needs. From beginners to advanced athletes, we
            have you covered with routines designed by expert trainers. Achieve your fitness goals with personalized workout plans tailored
            specifically to your needs. From beginners to advanced athletes, we
            have you covered with routines designed by expert trainers.
          </p>
          <button className="px-6 py-3 bg-red-700 text-white font-bold rounded-lg shadow-lg hover:bg-red-800 transition duration-300">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkoutSection;