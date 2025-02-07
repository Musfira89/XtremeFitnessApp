import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "../../public/LogoWhite.png"; // Update the path if needed
import fitnessBackground from "../assets/LandingPageImg/service1.png"; // Replace with a fitness-related image
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { updateAuth } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { user } = response.data;
  
        updateAuth({
          userId: user.id,
          fullName: user.fullName,
          email: user.email,
          hasCompletedQuestionnaire: user.hasCompletedQuestionnaire,
        });
  
        toast.success("Login successful!");
  
        // Check if the user has responses
        if (user.hasResponses) {
          // If responses exist, go to the dashboard
          navigate(`/dashboard/${user.id}`);
        } else {
          // If no responses, navigate to questions page
          navigate(`/questions/${user.id}`);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex h-screen font-sans">
      {/* Left Section */}
      <div
        className="w-1/2 relative flex flex-col justify-between items-center text-white px-8 py-6"
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
          <p className="text-sm leading-relaxed text-center">
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
      <div className="w-1/2 flex justify-center items-center bg-gray-100 p-20">
        <motion.div
          className="w-full p-12 bg-white rounded-2xl shadow-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-500">
              Login to continue your fitness journey.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
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

            {/* Login Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-gray-500 mt-6 text-center">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-red-500 font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
