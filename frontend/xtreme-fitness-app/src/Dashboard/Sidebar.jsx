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
  Settings,
  ExpandMore,
} from "@mui/icons-material";
import logo from "../../public/Logo.png";
import profileImage from "../../public/profile.png";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ userId }) => {
  const [activePath, setActivePath] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { auth } = useAuth();

  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <aside className="w-72 h-screen bg-gray-50 shadow-lg flex flex-col fixed top-0 left-0 overflow-y-auto">
      {/* Logo Section */}
      <div className="flex flex-col items-center py-6 border-b mb-10">
        <img src={logo} alt="Logo" className="w-32 h-auto object-contain" />
      </div>


      {/* Navigation Menu */}
      <nav className="px-6 py-2 flex-grow ">
        <ul className="space-y-2">
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
                onClick={() => setActivePath(to)}
                className={`flex items-center space-x-4 text-sm px-4 py-2 transition ${
                  activePath === to ? "text-red-700 font-semibold" : "text-gray-700 hover:text-gray-800"
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}

          {/* Settings Dropdown */}
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full text-sm px-4 py-2 transition text-gray-700 hover:text-gray-800"
            >
              <div className="flex items-center space-x-4">
                <Settings className="text-xl" />
                <span>Settings</span>
              </div>
              <ExpandMore className={`text-xl transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <ul className="bg-gray-50 rounded-lg shadow-md mt-2 space-y-1 absolute left-0 w-full">
                <li>
                  <NavLink
                    to={`/dashboard/${userId}/settingspage`}
                    className="block px-6 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/dashboard/${userId}/profilepage`}
                    className="block px-6 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/feedback/${userId}`}
                    className="block px-6 py-2 text-red-600 hover:bg-red-100"
                  >
                    Feedback
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
