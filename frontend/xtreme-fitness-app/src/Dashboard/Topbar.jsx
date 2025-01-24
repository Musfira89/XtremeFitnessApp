import React, { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-red-600 to-red-800 shadow-md backdrop-blur-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <button
          className="relative text-white hover:text-gray-200"
          aria-label="Notifications"
        >
          <FaBell className="text-2xl" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Profile & Settings Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-white hover:text-gray-200"
            onClick={toggleDropdown}
          >
            <FaUserCircle className="text-2xl" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-10">
              <button
                onClick={closeDropdown}
                className="absolute top-0 right-0 p-2 text-red-600 hover:text-red-800"
                aria-label="Close"
              >
                &times;
              </button>
              <a
                href="#profile"
                className="block px-4 py-2 text-red-700 hover:bg-gray-100 font-bold border-b-2 border-red-600"
              >
                Profile
              </a>
              <a
                href="#settings"
                className="block px-4 py-2 text-red-700 hover:bg-gray-100 font-bold border-b-2 border-red-600"
              >
                Settings
              </a>
              <a
                href="#logout"
                className="block px-4 py-2 text-red-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
