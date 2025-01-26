import React from "react";

const TrainingAbout = () => {
  return (
    <div
      className="relative w-full h-[80vh] bg-gradient-to-r from-red-700 via-red-800 to-red-400 flex flex-col items-center justify-center px-8 py-16 mb-32"
    >
   
      {/* Heading */}
      <h2 className="relative text-5xl font-extrabold text-white text-center z-10 mb-6">
        What is Xtreme Fitness Training?
      </h2>

      {/* Description Text */}
      <p className="relative text-lg text-white text-center max-w-3xl z-10">
        Xtreme Fitness Training is committed to helping our clients achieve their fitness goals. Through customized nutrition plans and training programs, we not only teach lifestyle change, but we also help develop the habits needed to ensure our clients maintain their results. Our clients bring their commitment, determination, and drive; we bring the tools and support they need to succeed.

        <br /><br />

        Xtreme Fitness Training believes in getting fit and staying fit by focusing on health issue prevention rather than cures. We provide 100% accountability and support to keep you focused and on track, which will allow you to reach your fitness goals and maintain them. All the uncertainties and guesswork will be eliminated through the specific diet and training program prescription that is tailored to each client.
      </p>
    </div>
  );
};

export default TrainingAbout;
