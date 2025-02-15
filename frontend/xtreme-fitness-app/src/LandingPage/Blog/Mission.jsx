import React from "react";
import { motion } from "framer-motion";
import missionImg from "../../assets/mission.png"; // Update the path if needed
import { Link } from "react-router-dom";

const XtremeMission = () => {
  return (
    <section className="container mx-auto px-14 py-16 mb-36">
      <div className="flex flex-col md:flex-row items-center gap-2 bg-white p-6">
        {/* Left Section (Image) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src={missionImg}
            alt="Xtreme Fitness Training"
            className="w-full md:w-[70%] h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right Section (Content) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-left"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            The Xtreme Mission
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Xtreme Fitness Training is committed to helping our clients achieve
            their fitness goals. Through customized nutrition plans and training
            programs, we not only teach lifestyle changes, but we also help
            develop the habits needed to ensure our clients maintain their
            results. Our clients bring their commitment, determination, and
            drive; we bring the tools and support they need to succeed.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Xtreme Fitness Training believes in getting fit and staying fit by
            focusing on the health issue prevention rather than the cures. We
            provide 100% accountability and support to keep you focused and on
            track, which will allow you to reach your fitness goals and maintain
            them. All the uncertainties and guesswork will be eliminated through
            the specific diet and training program prescription that is tailored
            to each client.
          </p>
          <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-red-800 text-white font-semibold rounded-md shadow-md"
>
  <Link to="/signup">Register Now With Us</Link>
</motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default XtremeMission;
