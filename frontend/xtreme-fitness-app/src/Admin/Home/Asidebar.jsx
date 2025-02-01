import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCreditCard, FaDumbbell, FaCogs } from "react-icons/fa";
import logo from "../../../public/Logo.png";
import profileImage from "../../assets/Xavier.jpg"; // Importing image from assets

const Sidebar = () => {
  return (
    <aside className="w-72 bg-gray-50 shadow-lg flex flex-col font-sans">
      {/* Logo Section */}
      <div className="flex flex-col items-center py-8 border-b">
        <img src={logo} alt="Logo" className="w-32 h-auto object-contain" />
      </div>
      {/* Profile Section */}
      <div className="flex flex-col items-center text-red-700 rounded-lg py-4 mb-2">
        <img
          src={profileImage}
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover mb-2 border-4 border-red-800"
        />
        <h2 className="font-bold text-xl text-red-800">Xavier Beckford</h2>
        <p className="text-sm text-red-700">xavier@example.com</p>
      </div>

      {/* Navigation Menu */}
      <nav className="px-6 py-6 flex-grow">
        <ul className="space-y-3">
          <li>
            <Link
              to="/admin"
              className="flex items-center space-x-4 text-sm px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold transition"
            >
              <FaHome className="text-red-700 text-[20px]" />
              <span>HOME</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/questionaire"
              className="flex items-center space-x-4 text-sm px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-800 font-semibold transition"
            >
              <FaCreditCard className="text-red-700 text-[20px]" />
              <span>QUESTION RESPONSE</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/meeting"
              className="flex items-center space-x-4 text-sm px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-800 font-semibold transition"
            >
              <FaDumbbell className="text-red-700 text-[20px]" />
              <span>MEETINGS + CHATS</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/profilepage"
              className="flex items-center space-x-4 text-sm px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-800 font-semibold transition"
            >
              <FaCogs className="text-red-700 text-[20px]" />
              <span>ADMIN PROFILE</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
