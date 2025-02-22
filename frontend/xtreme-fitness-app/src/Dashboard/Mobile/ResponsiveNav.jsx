import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Close, ExpandMore, Settings, Home, MenuBook, FitnessCenter, LocalPharmacy, ShowChart, VideoCall, CloudUpload, DateRange } from "@mui/icons-material";
import logo from "../../../public/Logo.png";

const ResponsiveNavbar = ({ userId, isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-700" onClick={toggleSidebar}>
          <Close fontSize="large" />
        </button>

        {/* Sidebar Header with Logo */}
        <div className="flex justify-center items-center p-4 border-b">
          <img src={logo} alt="Logo" className="w-24" />
        </div>

        {/* Navigation Links */}
        <ul className="mt-6 space-y-3 px-6">
          {[
            { to: `/dashboard/${userId}`, icon: <Home />, label: "Home" },
            { to: `/dashboard/${userId}/mealPlan`, icon: <MenuBook />, label: "Meal Plans" },
            { to: `/dashboard/${userId}/workoutPlan`, icon: <FitnessCenter />, label: "Workout Plans" },
            { to: `/dashboard/${userId}/supplements`, icon: <LocalPharmacy />, label: "Supplements" },
            { to: `/dashboard/${userId}/progress-tracking`, icon: <ShowChart />, label: "Progress Tracking" },
            { to: `/dashboard/${userId}/meeting`, icon: <VideoCall />, label: "Meetings/Chats" },
            { to: `/dashboard/${userId}/upload-progress`, icon: <CloudUpload />, label: "Upload Progress" },
            { to: `/dashboard/${userId}/monthly-progress`, icon: <DateRange />, label: "Monthly Progress" },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={toggleSidebar} // Close sidebar when navigating
                className="flex items-center space-x-3 text-sm text-gray-700 hover:text-red-700 transition"
              >
                <span className="text-base">{icon}</span>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}

          {/* Divider Line */}
          <hr className="my-4 border-gray-300" />

          {/* Settings Dropdown */}
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between w-full text-sm text-gray-700 hover:text-red-700 transition px-4 py-2"
            >
              <div className="flex items-center space-x-3">
                <Settings className="text-base" />
                <span>Settings</span>
              </div>
              <ExpandMore className={`text-base transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <ul className="bg-gray-white rounded-lg mt-2 space-y-1 pl-10">
                <li>
                  <NavLink to={`/dashboard/${userId}/settingspage`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" onClick={toggleSidebar}>
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/dashboard/${userId}/profilepage`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" onClick={toggleSidebar}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/feedback/${userId}`} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100" onClick={toggleSidebar}>
                    Feedback
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default ResponsiveNavbar;
