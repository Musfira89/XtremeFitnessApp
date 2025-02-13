import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  MenuBook,
  FitnessCenter,
  LocalPharmacy,
  ShowChart,
  VideoCall,
  AccountCircle,
} from "@mui/icons-material";
import logo from "../../public/Logo.png";
import profileImage from "../../public/profile.png"; // Replace with your actual image path
import { useAuth } from "../context/AuthContext"; // Import Auth Context


const Sidebar = ({ userId }) => {
  const [activePath, setActivePath] = useState(""); // State to track active path
  const location = useLocation();
  const { auth } = useAuth(); // Get auth state from context


  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <aside className="w-72 h-screen bg-gray-50 shadow-lg flex flex-col fixed top-0 left-0">
      {/* Logo Section */}
      <div className="flex flex-col items-center py-6 border-b">
        <img src={logo} alt="Logo" className="w-32 h-auto object-contain" />
      </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center text-red-700 rounded-lg py-6">
        <img
          src={profileImage}
          alt="User Profile"
          className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-red-800"
        />
        <h2 className="font-bold text-lg text-red-800">
          {auth.user?.fullName || "Guest User"}
        </h2>
        <p className="text-xs text-red-700">
          {auth.user?.email || "No Email Provided"}
        </p>
      </div> 

      {/* Navigation Menu */}
      <nav className="px-6 py-2 flex-grow">
        <ul className="space-y-2">
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
                onClick={() => setActivePath(to)} // Update active path on click
                className={`flex items-center space-x-4 text-sm px-4 py-2 transition ${
                  activePath === to
                    ? "text-red-700 font-semibold"
                    : "text-gray-700 hover:text-gray-800"
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="relative">
                  {label}
                  {/* Underline for active link */}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] bg-red-500 transition-all duration-300 ${
                      activePath === to ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  ></span>
                </span>
                
              </NavLink>
            </li>
          ))}
        </ul>
        
      </nav>
    </aside>
  );
};

export default Sidebar;
