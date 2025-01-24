import React from "react";
import { motion } from "framer-motion";
import {FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "../../public/Logo.png"; // Update the path if needed
import fitnessBackground from "../assets/fitness_1.jpg"; // Replace with a fitness-related image
const Login = () => {
  return (
    <div className="flex h-screen font-sans">
      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-br from-red-700 to-red-500 relative flex flex-col justify-between items-center text-white px-8 py-6">
        {/* Logo */}
        <motion.img
          src={Logo} // Replace with your logo image path
          alt="Logo"
          className="h-16 self-start"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Decorative Card */}
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold mb-4 text-center">
            Achieve Your Fitness Goals
          </h1>
          <p className="text-lg leading-relaxed text-center">
            Stay motivated with our personalized plans and expert advice.
          </p>
        </motion.div>

        {/* Highlight Text */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-2xl font-bold">#StrongerEveryday</p>
          <p className="text-lg mt-2">Join 10,000+ members on their journey!</p>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <motion.div
          className="w-4/5 max-w-lg p-10 bg-white rounded-2xl shadow-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-500">Login to continue your fitness journey.</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
              {/* Name Field */}
              <motion.div
              className="flex items-center border border-red-700 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-red-700 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <FaUser className="text-red-700 mr-3" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500"
              />
            </motion.div>
            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Log In
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-red-500 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
