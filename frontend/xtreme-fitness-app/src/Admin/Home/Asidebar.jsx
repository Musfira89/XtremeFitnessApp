import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  MenuBook,
  VideoCall,
  AccountCircle,
  FitnessCenter,
  ExpandMore,
  RestaurantMenu,
  DirectionsRun,
  MedicalServices,
} from "@mui/icons-material";
import logo from "../../../public/Logo.png";
import { useAdminAuth } from "../../context/AdminAuthContext";
import defaultProfileImage from "../../assets/Default.png";
import axios from "axios";

const Sidebar = () => {
  const [activePath, setActivePath] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { adminAuth } = useAdminAuth();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (!adminAuth.adminId) return;
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/${adminAuth.adminId}`
        );
        setAdminData(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdminData();
  }, [adminAuth.adminId]);

  const profileImageUrl = adminData?.profileImage
    ? `${import.meta.env.VITE_API_BASE_URL}/${adminData.profileImage.replace(
        /\\/g,
        "/"
      )}`
    : defaultProfileImage;

  return (
    <aside className="w-72 bg-gray-50 shadow-lg flex flex-col font-sans h-screen overflow-y-auto">
      <div className="flex flex-col items-center py-8 border-b">
        <img src={logo} alt="Logo" className="w-32 h-auto object-contain" />
      </div>

      <div className="flex flex-col items-center text-red-700 rounded-lg py-4 mb-2">
        <img
          src={profileImageUrl}
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover mb-2 border-4 border-red-800"
        />
        <h2 className="font-bold text-xl text-red-800">
          {adminData?.fullName || "Loading..."}
        </h2>
        <p className="text-sm text-red-700">
          {adminData?.email || "Loading..."}
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="px-6 py-2 flex-grow mb-24">
        <ul className="space-y-2">
          {[
            { to: `/admin`, icon: <Home />, label: "Home" },
            {
              to: `/admin/questionaire`,
              icon: <MenuBook />,
              label: "Question Responses",
            },
            { to: `/admin/userlist`, icon: <VideoCall />, label: "User List" },
            {
              to: `/admin/meeting`,
              icon: <VideoCall />,
              label: "Meeting + Chats",
            },
            {
              to: `/admin/feedback`,
              icon: <VideoCall />,
              label: "User Feedback",
            },
            {
              to: `/admin/userprogress`,
              icon: <VideoCall />,
              label: "User Progress",
            },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setActivePath(to)}
                className={`flex items-center space-x-4 text-sm px-4 py-2 transition ${
                  activePath === to
                    ? "text-red-700 font-semibold"
                    : "text-gray-700 hover:text-gray-800"
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="relative">{label}</span>
              </NavLink>
            </li>
          ))}

          {/* User Plans Dropdown - Moved below User Feedback */}
          <li className="relative mb-6">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between text-sm px-4 py-2 cursor-pointer transition text-gray-700 hover:text-gray-800"
            >
              <div className="flex items-center space-x-4">
                <FitnessCenter className="text-xl" />
                <span className="relative flex-grow">User Plans</span>
              </div>
              <ExpandMore
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {isDropdownOpen && (
              <ul className="absolute left-0 w-full bg-white shadow-lg mt-1 py-2 z-50 border border-gray-200">
                {[
                  {
                    to: `/admin/mealplan`,
                    icon: <RestaurantMenu />,
                    label: "Meal Plan",
                  },
                  {
                    to: `/admin/workoutplan`,
                    icon: <DirectionsRun />,
                    label: "Workout Plan",
                  },
                  {
                    to: `/admin/supplement`,
                    icon: <MedicalServices />,
                    label: "Supplement",
                  },
                ].map(({ to, icon, label }, index, array) => (
                  <li key={to} className="px-4 py-2 hover:bg-gray-100">
                    <NavLink
                      to={to}
                      onClick={() => setActivePath(to)}
                      className={`flex items-center text-sm transition ${
                        activePath === to
                          ? "text-red-700 font-semibold"
                          : "text-gray-700 hover:text-gray-800"
                      } ${
                        index !== array.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }`}
                    >
                      <span className="text-lg mr-3">{icon}</span>
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Profile and Settings */}
          {[
            {
              to: `/admin/profilepage`,
              icon: <AccountCircle />,
              label: "Profile",
            },
            {
              to: `/admin/settings`,
              icon: <AccountCircle />,
              label: "Settings",
            },
          ].map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setActivePath(to)}
                className={`flex items-center space-x-4 text-sm px-4 py-2 transition ${
                  activePath === to
                    ? "text-red-700 font-semibold"
                    : "text-gray-700 hover:text-gray-800"
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="relative">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
