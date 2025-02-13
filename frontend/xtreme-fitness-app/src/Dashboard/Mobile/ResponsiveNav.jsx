import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import {
  Home,
  MenuBook,
  FitnessCenter,
  LocalPharmacy,
  ShowChart,
  VideoCall,
  AccountCircle,
} from "@mui/icons-material";
import logo from "../../../public/Logo.png";

const ResponsiveNavbar = ({ userId }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="md:hidden bg-red-700 text-white flex justify-between items-center p-4 fixed w-full top-0 z-50">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-24" />

        {/* Menu Button */}
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {menuOpen ? <Close fontSize="large" /> : <Menu fontSize="large" />}
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
          <Close fontSize="large" />
        </button>

        {/* Navigation Links */}
        <ul className="mt-16 space-y-4 px-6">
          {[
            { to: `/dashboard/${userId}`, icon: <Home />, label: "Home" },
            { to: `/dashboard/${userId}/mealPlan`, icon: <MenuBook />, label: "Meal Plans" },
            { to: `/dashboard/${userId}/workoutPlan`, icon: <FitnessCenter />, label: "Workout Plans" },
            { to: `/dashboard/${userId}/supplements`, icon: <LocalPharmacy />, label: "Supplements" },
            { to: `/dashboard/${userId}/progress-tracking`, icon: <ShowChart />, label: "Progress Tracking" },
            { to: `/dashboard/${userId}/meeting`, icon: <VideoCall />, label: "Meetings/chats" },
            { to: `/dashboard/${userId}/profilepage`, icon: <AccountCircle />, label: "Profile" },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={toggleMenu} // Close menu on link click
                className="flex items-center space-x-4 text-lg text-gray-700 hover:text-red-700 transition"
              >
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ResponsiveNavbar;
