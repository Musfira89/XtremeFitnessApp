import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAdminAuth } from "../../context/AdminAuthContext";
import axios from "axios";


const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { adminAuth } = useAdminAuth();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (!adminAuth.adminId) return;
        const response = await axios.get(`http://localhost:5000/api/admin/${adminAuth.adminId}`);
        setAdminData(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, [adminAuth.adminId]);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-red-800 to-red-500 shadow-md text-white">
      {/* Title */}
      <h1 className="text-3xl font-bold tracking-wide uppercase">ADMIN Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center space-x-8">
        {/* Notification Icon */}
        <button className="relative text-white hover:text-gray-200 transition duration-300">
          <FaBell className="text-2xl" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-300 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition duration-300"
            onClick={toggleDropdown}
          >
            <FaUserCircle className="text-3xl" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-3 w-60 bg-white rounded-lg shadow-lg py-3 z-20 border border-gray-200"
              onMouseLeave={closeDropdown}
            >
              {/* Admin Info */}
              <div className="px-4 py-3 border-b">
                <p className="text-gray-500 text-sm">Welcome,</p>
                <p className="font-bold text-gray-900 text-lg">{adminData?.fullName || "Loading..."}</p>
              </div>

              {/* Dropdown Links */}
              <ul>
                <li>
                  <a
                    href="/admin/profilepage"
                    className="block px-4 py-3 text-gray-800 text-lg font-medium hover:bg-gray-100"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/settings"
                    className="block px-4 py-3 text-gray-800 text-lg font-medium hover:bg-gray-100"
                  >
                    Settings
                  </a>
                </li>
                <li>
                <li>
                  <a
                    href="/"
                    className="block px-4 py-3 hover:bg-red-100 text-red-600 font-medium"
                  >
                    Logout
                  </a>
                </li>
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
