import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "../../../public/Logo.png"; 
import adminBackground from "../../assets/LandingPageImg/service1.png"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { updateAuth } = useAuth(); // Assuming you're managing user context here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { admin } = response.data;

        // Update AuthContext with admin details
        updateAuth({ adminId: admin.id, fullName: admin.fullName, email: admin.email });

        toast.success("Admin login successful!");
        navigate("/admin");
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
        className="w-1/2 relative flex flex-col justify-center items-center text-white px-8 py-6"
        style={{
          backgroundImage: `url(${adminBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Logo */}
        <motion.img
          src={Logo}
          alt="Admin Logo"
          className="h-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Decorative Text */}
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 shadow-lg mt-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold mb-4 text-center">Admin Portal</h1>
          <p className="text-lg leading-relaxed text-center">
            Manage your platform efficiently and securely.
          </p>
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
            <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-500">Sign in to access the admin dashboard.</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Admin Email"
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Admin Password"
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
