import React from "react";
import { FaHome, FaCreditCard, FaUtensils, FaDumbbell, FaCogs } from "react-icons/fa";
import logo from "../../public/Logo.png";

const Sidebar = () => {
  return (
    <aside className="w-72 bg-gray-50 shadow-lg flex flex-col font-sans">
      {/* Logo Section */}
      <div className="flex flex-col items-center py-8 border-b">
        <img src={logo} alt="Logo" className="w-32 h-auto object-contain" />
      </div>

      {/* Navigation Menu */}
      <nav className="px-6 py-6 flex-grow">
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 text-lg px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold transition"
            >
              <FaHome className="text-red-500 text-2xl" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 text-lg px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-800 font-semibold transition"
            >
              <FaCreditCard className="text-red-500 text-2xl" />
              <span>Payment</span>
            </a>
          </li>
        
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 text-lg px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-800 font-semibold transition"
            >
              <FaDumbbell className="text-red-500 text-2xl" />
              <span>Manage Meals & Workouts</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 text-lg px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-800 font-semibold transition"
            >
              <FaCogs className="text-red-500 text-2xl" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
