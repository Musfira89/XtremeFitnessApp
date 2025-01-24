import React from "react";
import { motion } from "framer-motion";
import BgImg from "../../assets/th.png"; // Replace with your hero image path
import logo from "../../../public/Logo.png"; // Replace with your logo path
import { Link } from "react-router-dom"; // Import Link for navigation

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-white to-red-50 text-gray-800 min-h-screen flex flex-col overflow-hidden">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 z-20">
        <motion.img
          src={logo}
          alt="Logo"
          className="h-12 object-contain"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <ul className="flex space-x-8 text-lg font-semibold text-gray-800">
          {["Home", "Our Work", "What We Do", "About Us"].map((item, index) => (
            <motion.li
              key={index}
              className="hover:text-red-500 cursor-pointer transition-colors"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * index }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Link
            to="/admin" // Link for the Admin button
            className="px-6 py-2 border-2 border-red-500 text-red-500 font-semibold text-lg rounded-lg hover:bg-red-100 transition-all"
          >
            Admin
          </Link>
          <Link
            to="/signup" // Link for the User button
            className="px-6 py-2 bg-red-500 text-white font-semibold text-lg rounded-lg hover:bg-red-600 transition-all"
          >
            User
          </Link>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-1 items-center justify-between px-12 lg:px-24 xl:px-32 py-12">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-lg"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text leading-tight">
            Welcome to
          </h1>
          <motion.h2
            className="text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text mt-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            XTREMEFT
          </motion.h2>
          <motion.p
            className="mt-6 text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            Transform your fitness goals into reality with expert guidance and
            unparalleled support.
          </motion.p>
          <motion.button
            className="mt-8 px-6 py-3 border-2 border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-100 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            JOIN NOW
          </motion.button>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={BgImg}
            alt="Hero"
            className="h-[32rem] w-[32rem] object-contain rounded-lg"
          />
          {/* Light Red Shadow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center -z-10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute w-[40rem] h-[40rem] bg-red-300 opacity-30 rounded-full blur-3xl"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Red Highlights */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-red-200 rounded-full opacity-20 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-20 right-20 w-60 h-60 bg-red-200 rounded-full opacity-20 blur-3xl"
        animate={{ scale: [1, 0.9, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
};

export default HeroSection;