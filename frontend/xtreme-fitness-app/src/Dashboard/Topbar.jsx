import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const Topbar = () => {
  const { userId } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [planName, setPlanName] = useState("Free Plan");
  const { auth } = useAuth();

  useEffect(() => {
    const fetchPlanName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/${userId}/plan`
        );
        console.log("API Response:", response.data); 
        setPlanName(response.data.planName);
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };

    if (userId) {
      fetchPlanName();
    }
  }, [userId]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-red-700 to-red-800 shadow-md text-white">
      {/* Logo/Title Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-wide uppercase">
          Dashboard
        </h1>
        <a
          href={`/dashboard/${userId}/meeting`}
          className="mt-1 text-md underline text-gray-200 cursor-pointer hover:text-gray-100"
        >
          Join Meeting
        </a>
      </div>

      {/* Right Section: Notification + Profile + Plan Status */}
      <div className="flex items-center space-x-8">
        {/* Plan Status */}
        <div className="flex items-center space-x-4">
          <div className="text-sm py-1 px-3 rounded-full bg-gray-100 text-gray-800">
            {planName || "Fetching..."}
          </div>

          <Link to={`/planpage/${userId}`}>
            <p className="text-sm text-gray-100 cursor-pointer hover:text-white">
              <span className="underline">Upgrade Plan</span>
            </p>
          </Link>
        </div>

        {/* Notification Icon with Badge */}
        <button className="relative text-white hover:text-gray-200 transition duration-300 ease-in-out">
          <FaBell className="text-2xl" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-300 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition duration-300 ease-in-out"
            onClick={toggleDropdown}
          >
            <FaUserCircle className="text-3xl" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-lg py-3 z-20 border border-gray-200"
              onMouseLeave={closeDropdown}
            >
              <div className="px-4 py-2 border-b">
                <p className="text-sm text-gray-600">Welcome,</p>
                <p className="font-semibold text-gray-900">
                  {auth.user?.fullName || "Guest User"}
                </p>
              </div>
              <ul>
                <li>
                  <a
                    href="/dashboard/${userId}/profilepage"
                    className="block px-4 py-3 hover:bg-gray-100 text-gray-800 font-medium"
                  >
                    Profile
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    className="block px-4 py-3 hover:bg-red-100 text-red-600 font-medium"
                  >
                    Logout
                  </a>
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
