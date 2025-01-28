import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaClipboardList, FaChartLine, FaVideo, FaBullseye } from "react-icons/fa";
import logo from "../../public/Logo.png";
import profileImage from "../../public/profile.png"; // Replace with your actual image path or placeholder image

const Sidebar = () => {
  return (
    <aside className="w-72 h-screen bg-gray-50 shadow-lg flex flex-col fixed top-0 left-0">
      {/* Logo Section */}
      <div className="flex flex-col items-center py-6 border-b">
        <img src={logo} alt="Logo" className="w-32 h-auto object-contain" />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center text-red-700 rounded-lg py-4 mb-2">
        <img
          src={profileImage}
          alt="User Profile"
          className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-red-800"
        />
        <h2 className="font-bold text-lg text-red-800">John Doe</h2>
        <p className="text-xs text-red-600">johndoe@example.com</p>
      </div>

      {/* Red Line Divider */}
      <div className="border-t-2 border-gray-100 my-4"></div>

      {/* Navigation Menu */}
      <nav className="px-6 py-2 flex-grow">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-4 text-sm px-4 py-2 rounded-lg ${
                  isActive ? "bg-gray-100 text-gray-800 font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                } transition`
              }
            >
              <FaHome className="text-red-500 text-xl" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/mealPlan"
              className={({ isActive }) =>
                `flex items-center space-x-4 text-sm px-4 py-2 rounded-lg ${
                  isActive ? "bg-gray-100 text-gray-800 font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                } transition`
              }
            >
              <FaClipboardList className="text-red-500 text-xl" />
              <span>Meal Plans</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/workoutPlan"
              className={({ isActive }) =>
                `flex items-center space-x-4 text-sm px-4 py-2 rounded-lg ${
                  isActive ? "bg-gray-100 text-gray-800 font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                } transition`
              }
            >
              <FaClipboardList className="text-red-500 text-xl" />
              <span>Workout Plans</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/supplements"
              className={({ isActive }) =>
                `flex items-center space-x-4 text-sm px-4 py-2 rounded-lg ${
                  isActive ? "bg-gray-100 text-gray-800 font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                } transition`
              }
            >
              <FaChartLine className="text-red-500 text-xl" />
              <span>Supplements</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/progress-tracking"
              className={({ isActive }) =>
                `flex items-center space-x-4 text-sm px-4 py-2 rounded-lg ${
                  isActive ? "bg-gray-100 text-gray-800 font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                } transition`
              }
            >
              <FaChartLine className="text-red-500 text-xl" />
              <span>Progress Tracking</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/meeting"
              className={({ isActive }) =>
                `flex items-center space-x-4 text-sm px-4 py-2 rounded-lg ${
                  isActive ? "bg-gray-100 text-gray-800 font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                } transition`
              }
            >
              <FaVideo className="text-red-500 text-xl" />
              <span>Zoom/Meetings</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profilepage"
              className={({ isActive }) =>
                `flex items-center space-x-4 text-sm px-4 py-2 rounded-lg ${
                  isActive ? "bg-gray-100 text-gray-800 font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                } transition`
              }
            >
              <FaBullseye className="text-red-500 text-xl" />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
