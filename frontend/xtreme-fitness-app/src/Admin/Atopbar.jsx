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
    <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-800 shadow-md text-white">
      {/* Logo/Title Section */}
      <h1 className="text-3xl font-bold tracking-wide uppercase">ADMIN Dashboard</h1>

      {/* Right Section: Notification + Profile */}
      <div className="flex items-center space-x-8">
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
                <p className="font-semibold text-gray-900">John Doe</p>
              </div>
              <ul>
                <li>
                  <a
                    href="#profile"
                    className="block px-4 py-3 hover:bg-gray-100 text-gray-800 font-medium"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#settings"
                    className="block px-4 py-3 hover:bg-gray-100 text-gray-800 font-medium"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#logout"
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
