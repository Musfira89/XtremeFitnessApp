import React, { useState } from "react";
import { motion } from "framer-motion";
import BgImg from "../../assets/LandingPageImg/headerNew.jpg"; // Replace with your hero image path
import { HashLink as Link } from "react-router-hash-link";
import { FaPlay, FaTimes } from "react-icons/fa";

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      id="home"
      className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-6 sm:px-10"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      {/* Overlay (Mobile Darker) */}
      <div className="absolute inset-0 bg-black/50 md:bg-red-800/30"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-white space-y-6 max-w-3xl px-4 md:px-0 md:pt-28 lg:pt-36">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-wider"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          WELCOME TO <span className="text-red-700">XTREME</span>
          <br /> FITNESS TRAINING
        </motion.h1>

        <p className="text-sm sm:text-lg md:text-xl leading-relaxed opacity-90">
          At Xtreme Fitness Training, we help you achieve your fitness and wellness goals through personalized and innovative online coaching.
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link to="/signup">
            <button className="px-6 sm:px-10 py-3 bg-red-700 hover:bg-red-600 text-white text-lg font-semibold rounded-md shadow-lg transition-transform transform hover:scale-105">
              Get Free Trial Today
            </button>
          </Link>

          {/* Watch Training Video Button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 text-white text-lg font-semibold hover:opacity-80 transition"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-red-700 hover:bg-red-600 text-white rounded-full shadow-md transition-transform transform hover:scale-110">
              <FaPlay size={16} />
            </div>
            Watch Training Video
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md z-50 px-4">
          {/* Close Button */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-5 right-5 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all"
          >
            <FaTimes size={20} />
          </button>

          {/* Video Frame */}
          <div className="relative w-full max-w-md sm:max-w-lg md:max-w-3xl">
            <iframe
              className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] rounded-lg shadow-xl"
              src="https://www.youtube.com/embed/i89fWv7g5Bg?autoplay=1"
              title="Training Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
