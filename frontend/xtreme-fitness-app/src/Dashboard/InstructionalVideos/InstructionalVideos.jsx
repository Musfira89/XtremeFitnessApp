import React from "react";

const InstructionalVideos = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-extrabold text-white tracking-wide">
        Instructional Videos
      </h3>
      <p className="text-white mt-2 text-lg">
        Access exercise videos tailored to your workout plan for proper guidance
        and form.
      </p>
      {/* Video Content Section */}
      <div className="mt-6 bg-white h-48 rounded-lg flex flex-col items-center justify-center shadow-inner">
        <span className="text-red-500 font-semibold text-lg">
          Your Fitness Videos Will Appear Here!
        </span>
        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300">
          Explore Videos
        </button>
      </div>
    </div>
  );
};

export default InstructionalVideos;
