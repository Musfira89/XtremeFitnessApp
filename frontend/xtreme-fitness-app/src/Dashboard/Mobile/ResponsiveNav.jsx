import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Close, ExpandMore } from "@mui/icons-material";
import {
  Home,
  MenuBook,
  FitnessCenter,
  LocalPharmacy,
  ShowChart,
  VideoCall,
  AccountCircle,
  Settings,
} from "@mui/icons-material";
import logo from "../../../public/Logo.png";

const ResponsiveNavbar = ({ userId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="md:hidden bg-red-700 text-white flex justify-between items-center p-4 fixed w-full top-0 z-50">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-20" />

        {/* Menu Button */}
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {menuOpen ? <Close fontSize="medium" /> : <Menu fontSize="medium" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-700"
        >
          <Close fontSize="medium" />
        </button>

        {/* Navigation Links */}
        <ul className="mt-16 space-y-3 px-6">
          {[
            { to: `/dashboard/${userId}`, icon: <Home />, label: "Home" },
            { to: `/dashboard/${userId}/mealPlan`, icon: <MenuBook />, label: "Meal Plans" },
            { to: `/dashboard/${userId}/workoutPlan`, icon: <FitnessCenter />, label: "Workout Plans" },
            { to: `/dashboard/${userId}/supplements`, icon: <LocalPharmacy />, label: "Supplements" },
            { to: `/dashboard/${userId}/progress-tracking`, icon: <ShowChart />, label: "Progress Tracking" },
            { to: `/dashboard/${userId}/meeting`, icon: <VideoCall />, label: "Meetings/Chats" },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={toggleMenu} // Close menu on link click
                className="flex items-center space-x-3 text-sm text-gray-700 hover:text-red-700 transition"
              >
                <span className="text-base">{icon}</span>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}

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
              <ul className="bg-gray-white rounded-lg  mt-2 space-y-1 pl-10">
                <li>
                  <NavLink
                    to={`/dashboard/${userId}/settingspage`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={toggleMenu}
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/${userId}/profilepage`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={toggleMenu}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/feedback/${userId}`}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                    onClick={toggleMenu}
                  >
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
