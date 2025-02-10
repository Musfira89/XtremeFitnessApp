import React, { useState } from "react";
import { motion } from "framer-motion";
import BgImg from "../../assets/LandingPageImg/headerNew.jpg"; // Replace with your hero image path
import logo from "../../../public/Logo.png"; // Replace with your logo path
import { HashLink as Link } from "react-router-hash-link";
import { FaPlay, FaTimes } from "react-icons/fa";

// Keyframes for vibration effect
const buttonVibrate = `
@keyframes vibrate {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(5px); }
}
`;

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      id="home"
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${BgImg})`,
      }}
    >
      {/* Red Overlay */}
      <div className="absolute inset-0 bg-red-800/60"></div>

      {/* Logo */}
      <div className="absolute top-6 left-10 z-10">
        <img src={logo} alt="Logo" className="h-20" />
      </div>

      {/* Navbar */}
      <div className="absolute top-4 left-0 w-full z-10">
        <div className="flex justify-end">
          <nav className="hidden md:flex space-x-10 px-14 py-6 bg-red-900/80 items-center">
            <Link
              smooth
              to="/#home"
              className="text-white font-medium hover:text-gray-300"
            >
              HOME
            </Link>
            <Link
              smooth
              to="/#products"
              className="text-white font-medium hover:text-gray-300"
            >
              PRODUCTS
            </Link>
            <Link
              smooth
              to="/#about-us"
              className="text-white font-medium hover:text-gray-300"
            >
              ABOUT US
            </Link>
            <Link
              smooth
              to="/#services"
              className="text-white font-medium hover:text-gray-300"
            >
              SERVICES
            </Link>
            <Link
              smooth
              to="/#pricing"
              className="text-white font-medium hover:text-gray-300"
            >
              PRICING
            </Link>
            <Link
              smooth
              to="/#faq"
              className="text-white font-medium hover:text-gray-300"
            >
              FAQ
            </Link>
            <Link
              smooth
              to="/#reviews"
              className="text-white font-medium hover:text-gray-300"
            >
              REVIEWS
            </Link>
            <Link
              smooth
              to="/#contact-us"
              className="text-white font-medium hover:text-gray-300"
            >
              CONTACT US
            </Link>
            {/* Sign In Link */}
            <Link
              to="/signup"
              className="text-white font-medium uppercase tracking-wide hover:text-gray-300 transition-all duration-300"
            >
              Sign In
            </Link>
            {/* USER Button */}
            <Link to="/adminlogin">
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-white text-white uppercase font-semibold tracking-wide hover:bg-white hover:text-red-800 transition-all duration-300">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A4 4 0 018.107 16h7.786a4 4 0 012.986 1.804M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </span>
                Admin
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-white px-4 py-6">
            <motion.div whileHover={{ scale: 1.1 }}>☰</motion.div>
          </div>
        </div>
      </div>

      {/* Hero Text */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20"
        style={{ marginTop: "180px" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wider font-poppins drop-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          WELCOME TO <span className="text-red-700">XTREME</span>
          <br /> FITNESS TRAINING
        </motion.h1>

        <p className="mt-6 text-lg md:text-xl max-w-2xl leading-relaxed opacity-90">
          At Xtreme Fitness Training, we help you achieve your fitness and
          wellness goals through personalized and innovative online coaching.
        </p>

        {/* Buttons Container */}
        <div className="flex items-center gap-6 mt-10">
  
 
          <Link to="/signup">
            <button className="px-10 py-4 bg-red-700 hover:bg-red-600 text-white text-lg font-semibold rounded-md shadow-lg transition-transform transform hover:scale-105">
              Get Started Today
            </button>
          </Link>

          {/* Watch Training Video Button (Now works correctly) */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 text-white text-lg font-semibold hover:opacity-80 transition"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-red-700 hover:bg-red-600 text-white rounded-full shadow-md transition-transform transform hover:scale-110">
              <FaPlay size={18} />
            </div>
            Watch Training Video
          </button>
        </div>
      </div>

      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md z-50 px-4">
    
    {/* Close Button */}
    <button
      onClick={() => setShowModal(false)}
      className="absolute top-8 right-8 bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all"
    >
      <FaTimes size={24} />
    </button>

    {/* Embedded Video */}
    <div className="relative">
      <iframe
        className="w-[90vw] max-w-4xl h-[60vh] md:h-[70vh] rounded-lg shadow-xl"
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
