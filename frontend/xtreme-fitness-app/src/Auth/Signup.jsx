import React, { useState } from "react";
import Logo from "../../public/LogoWhite.png";
import fitnessBackground from "../assets/LandingPageImg/service1.png";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        fullName,
        email,
        password,
      });

      // Show success toast
      toast.success("User registered successfully!");

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Set error message
      } else {
        setError("Something went wrong. Please try again."); // General error message
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  
  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      {/* Left Section */}
      <div
        className="md:w-1/2 w-full relative flex flex-col justify-between items-center text-white px-6 py-8"
        style={{
          backgroundImage: `url(${fitnessBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Logo */}
        <motion.img
          src={Logo} // Replace with your logo image path
          alt="Logo"
          className="h-12 md:h-16 self-start"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Decorative Card */}
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 md:p-6 shadow-lg text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-4xl font-extrabold mb-4">
            Achieve Your Fitness Goals
          </h1>
          <p className="text-sm md:text-md leading-relaxed">
            Stay motivated with our personalized plans and expert advice.
          </p>
        </motion.div>

        {/* Highlight Text */}
        <motion.div
          className="mt-6 md:mt-10 text-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-2xl font-bold">#StrongerEveryday</p>
          <p className="text-sm md:text-lg mt-2">
            Join 10,000+ members on their journey!
          </p>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full flex justify-center items-center bg-gray-100 p-6 md:p-20">
        <motion.div
          className="w-full max-w-md p-8 md:p-12 bg-white rounded-2xl shadow-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Create an Account
            </h2>
            <p className="text-sm md:text-base text-gray-500">
              Join us and start your fitness journey.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </motion.div>

            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Display Error */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Sign Up Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-gray-500 mt-4 md:mt-6 text-center">
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

export default Signup;