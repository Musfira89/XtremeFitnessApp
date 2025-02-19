import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { useAdminAuth } from "../../context/AdminAuthContext";
import axios from "axios";
import AdminNoti from "../AdminNoti";

const Topbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { adminAuth } = useAdminAuth();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (!adminAuth.adminId) return;
        const response = await axios.get(
          `http://localhost:5000/api/admin/${adminAuth.adminId}`
        );
        setAdminData(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, [adminAuth.adminId]);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-red-800 to-red-500 shadow-md text-white">
      {/* Left Section - Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide uppercase">
          Admin Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 lg:space-x-6">
        {/* Notification Icon */}
        <button className="relative text-white hover:text-gray-200 transition duration-300">
          <AdminNoti />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center text-white hover:text-gray-200 transition duration-300"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle className="text-3xl" />
          </button>
          
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-3 w-60 bg-white rounded-lg shadow-lg py-3 z-20 border border-gray-200 transition-transform transform origin-top scale-100"
            >
              <div className="px-4 py-3 border-b">
                <p className="text-gray-500 text-sm">Welcome,</p>
                <p className="font-bold text-gray-900 text-lg">
                  {adminData?.fullName || "Loading..."}
                </p>
              </div>
              <ul>
                <li>
                  <a
                    href="/admin/profilepage"
                    className="block px-4 py-3 text-gray-800 text-lg font-medium hover:bg-gray-100 transition"
                  >
                    Profile
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    href="/"
                    className="block px-4 py-3 text-gray-800 text-lg font-medium hover:bg-gray-100 transition"
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
