import React from "react";
import { motion } from "framer-motion";
import before from "../../assets/before.png";
import after from "../../assets/after.png";
import { Link } from "react-router-dom";

const FitnessJourney = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-pink-100 flex flex-col items-center py-12 px-6 text-center mb-32"
    >
      {/* Image Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 mb-8 w-full px-4">
        <div className="relative w-full sm:w-1/3 md:w-1/4 bg-gray-100 p-2 rounded-lg shadow-lg">
          <img
            src={before}
            alt="Before"
            className="w-full rounded-lg shadow-md border-4 border-white"
          />
          <p className="absolute bottom-2 left-2 text-xs font-semibold bg-white px-2 py-1 rounded shadow-md">
            Before
          </p>
        </div>

        <div className="relative w-full sm:w-1/3 md:w-1/4 bg-gray-50 p-2 rounded-lg shadow-lg">
          <img
            src={after}
            alt="After"
            className="w-full rounded-lg shadow-md border-4 border-white"
          />
          <p className="absolute bottom-2 left-2 text-xs font-semibold bg-white px-2 py-1 rounded shadow-md">
            After
          </p>
        </div>
      </div>

      {/* Content Section */}
      <h2 className="text-3xl sm:text-4xl font-bold mt-6 text-gray-800">
        My Fitness Journey
      </h2>
      <p className="max-w-3xl mt-5 text-base sm:text-lg text-gray-700 leading-relaxed px-4">
        In 2006, Xavier weighed a whopping 285 lbs. His poor diet and lifestyle
        led to depression, low self-esteem, and major health challenges— including
        the risk of diabetes, low energy, and lack of strength. He had two choices:
        continue down an unhealthy path or take charge of his life.
      </p>
      <p className="max-w-3xl mt-4 text-base sm:text-lg text-gray-700 leading-relaxed px-4">
        Today, Xavier lives a balanced and healthy lifestyle. He enjoys traveling
        and constantly explores new destinations. Through{" "}
        <span className="font-bold text-red-500">Xtreme Fitness Training</span>,
        he now helps people worldwide achieve their fitness goals in a fun and
        supportive environment.
      </p>

      {/* Call-to-Action Button */}
      <Link to="/signup">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-red-800 text-white font-semibold rounded-md shadow-md mt-6"
        >
          Register Now With Us
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default FitnessJourney;
