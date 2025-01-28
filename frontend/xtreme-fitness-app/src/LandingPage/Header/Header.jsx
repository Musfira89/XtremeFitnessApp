import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BgImg from "../../assets/LandingPageImg/headerNew.jpg"; // Replace with your hero image path
import logo from "../../../public/Logo.png"; // Replace with your logo path

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
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${BgImg})`,
      }}
    >
      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-red-900/30"></div>

      {/* Logo */}
      <div className="absolute top-6 left-10 z-10">
        <img src={logo} alt="Logo" className="h-20" />
      </div>

      {/* Navbar */}
      <div className="absolute top-4 left-0 w-full z-10">
        <div className="flex justify-end">
          <nav className="hidden md:flex space-x-10 px-14 py-6 bg-red-900/80 items-center">
            <Link to="/home" className="text-white font-medium hover:text-gray-300">
              HOME
            </Link>
            <Link to="/pages" className="text-white font-medium hover:text-gray-300">
              PRODUCTS
            </Link>
            <Link to="/portfolio" className="text-white font-medium hover:text-gray-300">
              PRICING
            </Link>
            <Link to="/blog" className="text-white font-medium hover:text-gray-300">
              ABOUT US
            </Link>
            <Link to="/shop" className="text-white font-medium hover:text-gray-300">
              BIO
            </Link>
            <Link to="/events" className="text-white font-medium hover:text-gray-300">
              FAQ
            </Link>
            <Link to="/info" className="text-white font-medium hover:text-gray-300">
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
            <Link to="/admin">
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
        style={{ marginTop: "190px" }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold leading-snug tracking-widest font-poppins"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          WELCOME TO XTREMEFT<br /> Fitness Training
        </motion.h1>
        <p className="mt-6 text-lg md:text-xl max-w-lg leading-relaxed">
          At Xtreme Fitness Training, we are dedicated to helping you achieve your fitness and wellness goals through personalized and innovative online coaching.
        </p>
        {/* Button with Vibration Animation */}
        <style>{buttonVibrate}</style>
        <button
          className="mt-10 px-14 py-4 border-2 border-white text-white uppercase font-semibold tracking-wide animate-vibrate"
          style={{
            animation: "vibrate 1s ease-out",
          }}
        >
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
