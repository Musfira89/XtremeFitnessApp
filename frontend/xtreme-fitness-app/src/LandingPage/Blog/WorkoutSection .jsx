import React, { useState } from "react";
import { motion } from "framer-motion";
import coachImg from "../../assets/Xavier.jpg"; // Replace with your image path

const CoachBio = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="flex flex-col md:flex-row items-center px-6 py-12 mt-28 mb-44">
      {/* Left Section - Image */}
      <motion.div
        className="md:w-1/2 w-full relative text-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={coachImg}
          alt="Coach"
          className="w-72 h-72 object-cover rounded-full mx-auto mb-6 shadow-lg"
        />
        {/* Add "XtremeFt Trainer" text below the image */}
        <p className="text-red-700 text-sm mt-2">XtremeFt Trainer</p>
      </motion.div>

      {/* Right Section - Text */}
      <motion.div
        className="md:w-1/2 w-full flex flex-col justify-center items-start px-8"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-lg">
          <h1 className="text-5xl font-extrabold text-red-800 mb-6">
            Xavier Beckford Bio
          </h1>
          <p className="text-gray-700 mb-6">
            Xtreme Fitness Training is committed to helping our clients achieve
            their fitness goals. Through customized nutrition plans and training
            programs, we not only teach lifestyle change, but we also help
            develop the habits needed to ensure our clients maintain their
            results. Our clients bring their commitment, determination, and
            drive; we bring the tools and support they need to succeed.
          </p>
          {isExpanded && (
            <p className="text-gray-700 mb-6">
              Xtreme Fitness Training believes in getting fit and staying fit by
              focusing on the health issue prevention rather than the cures. We
              provide 100% accountability and support to keep you focused and on
              track which will allow you to reach your fitness goals and
              maintain them. All the uncertainties and guesswork will be
              eliminated through the specific diet and training program
              prescription that is tailored to each client.
            </p>
          )}

          <button
            onClick={toggleReadMore}
            className="px-6 py-3 bg-red-700 text-white font-bold rounded-lg shadow-lg hover:bg-red-800 transition duration-300"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CoachBio;
