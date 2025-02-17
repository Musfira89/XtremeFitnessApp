import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NotificationsDropdown from "./Noti";

const Topbar = ({ toggleMobileMenu }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [planName, setPlanName] = useState("Free Plan");
  const [expiryDate, setExpiryDate] = useState(null);
  const [trialExpiryDate, setTrialExpiryDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [trialTimeLeft, setTrialTimeLeft] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/${userId}/plan`);
        console.log("API Response:", response.data);

        setPlanName(response.data.planName || "Free Plan");
        setExpiryDate(response.data.planExpiry ? new Date(response.data.planExpiry) : null);
        setTrialExpiryDate(response.data.trialExpiryDate ? new Date(response.data.trialExpiryDate) : null);
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };

    if (userId) {
      fetchPlanDetails();
    }
  }, [userId]);

  useEffect(() => {
    const updateCountdown = (expiry, setTime) => {
      if (!expiry) return;

      const interval = setInterval(() => {
        const now = new Date();
        const timeDiff = expiry - now;

        if (timeDiff <= 0) {
          setTime("Expired");
          navigate(`/planpage/${userId}`); // Redirect on expiry
          clearInterval(interval);
          return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        setTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(interval);
    };

    const planTimerCleanup = updateCountdown(expiryDate, setTimeLeft);
    const trialTimerCleanup = updateCountdown(trialExpiryDate, setTrialTimeLeft);

    return () => {
      if (planTimerCleanup) planTimerCleanup();
      if (trialTimerCleanup) trialTimerCleanup();
    };
  }, [expiryDate, trialExpiryDate, navigate, userId]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-red-700 to-red-800 shadow-md text-white">
      {/* Left Side - Logo & Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        <button className="md:hidden text-white text-2xl" onClick={toggleMobileMenu}>
          <FaBars />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide uppercase">Dashboard</h1>
          <Link to={`/dashboard/${userId}/meeting`} className="mt-1 text-sm underline text-gray-200 hover:text-gray-100">
            Join Meeting
          </Link>
        </div>
      </div>

      {/* Right Side - Plan, Notifications, Profile */}
      <div className="flex items-center space-x-4 md:space-x-8">
        {/* Plan Status */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-sm py-1 px-3 rounded-full bg-gray-100 text-gray-800">{planName}</div>
          {timeLeft && (
            <div className={`text-sm font-semibold ${timeLeft === "Expired" ? "text-red-500" : "text-yellow-500"}`}>
              {timeLeft === "Expired" ? "Plan Expired!" : `Expires in: ${timeLeft}`}
            </div>
          )}
          {trialTimeLeft && (
            <div className={`text-sm font-semibold ${trialTimeLeft === "Expired" ? "text-yellow-500" : "text-yellow-300"}`}>
              {trialTimeLeft === "Expired" ? "Trial Expired!" : `Trial expires in: ${trialTimeLeft}`}
            </div>
          )}
          <Link to={`/planpage/${userId}`} className="text-sm text-gray-100 hover:text-white">
            <span className="underline">Upgrade Plan</span>
          </Link>
        </div>

        {/* Notification Icon */}
        <button className="relative text-white hover:text-gray-200 transition duration-300 ease-in-out">
          <NotificationsDropdown />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition duration-300 ease-in-out"
            onClick={toggleDropdown}
          >
            <FaUserCircle className="text-3xl" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-lg py-3 z-20 border border-gray-200">
              <div className="px-4 py-2 border-b">
                <p className="text-sm text-gray-600">Welcome,</p>
                <p className="font-semibold text-gray-900">{auth.user?.fullName || "Guest User"}</p>
              </div>
              <ul>
                <li>
                  <Link to={`/dashboard/${userId}/profilepage`} className="block px-4 py-3 hover:bg-gray-100 text-gray-800 font-medium">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/" className="block px-4 py-3 hover:bg-red-100 text-red-600 font-medium">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
