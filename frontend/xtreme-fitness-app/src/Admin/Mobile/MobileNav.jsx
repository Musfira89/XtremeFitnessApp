import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  MenuBook,
  People,
  Chat,
  Feedback,
  Settings,
  AccountCircle,
  FitnessCenter,
  ExpandMore,
  RestaurantMenu,
  DirectionsRun,
  MedicalServices,
} from "@mui/icons-material";
import { Close } from "@mui/icons-material";
import logo from "../../../public/Logo.png";
import { useAdminAuth } from "../../context/AdminAuthContext";
import defaultProfileImage from "../../assets/Default.png";
import axios from "axios";

const MobileSidebar = ({ isOpen, toggleSidebar }) => {
  const { adminAuth } = useAdminAuth();
  const [adminData, setAdminData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (!adminAuth.adminId) return;
        const response = await axios.get(`http://localhost:5000/api/admin/${adminAuth.adminId}`);
        setAdminData(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdminData();
  }, [adminAuth.adminId]);

  const profileImageUrl = adminData?.profileImage
    ? `http://localhost:5000/${adminData.profileImage.replace(/\\/g, "/")}`
    : defaultProfileImage;

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

        {/* Logo Section */}
        <div className="flex flex-col items-center py-6 border-b">
          <img src={logo} alt="Logo" className="w-28 h-auto object-contain" />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center text-red-700 py-4">
          <img
            src={profileImageUrl}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover mb-2 border-4 border-red-800"
          />
          <h2 className="font-bold text-lg text-red-800">{adminData?.fullName || "Loading..."}</h2>
          <p className="text-sm text-red-700">{adminData?.email || "Loading..."}</p>
        </div>

        {/* Navigation Menu */}
        <nav className="px-6 py-2">
          <ul className="space-y-2">
            {[
              { to: `/admin`, icon: <Home />, label: "Home" },
              { to: `/admin/questionaire`, icon: <MenuBook />, label: "Question Responses" },
              { to: `/admin/userlist`, icon: <People />, label: "User List" },
              { to: `/admin/meeting`, icon: <Chat />, label: "Meeting + Chats" },
              { to: `/admin/feedback`, icon: <Feedback />, label: "User Feedback" },
              { to: `/admin/profilepage`, icon: <AccountCircle />, label: "Profile" },
              { to: `/admin/settings`, icon: <Settings />, label: "Settings" },
            ].map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={toggleSidebar}
                  className="flex items-center space-x-4 text-sm px-4 py-2 text-gray-700 hover:text-gray-800"
                >
                  <span className="text-xl">{icon}</span>
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}

            {/* User Plans Dropdown - Added below User Feedback */}
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
                  className={`transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {isDropdownOpen && (
                <ul className="absolute left-0 w-full bg-white shadow-lg mt-1 py-2 z-50 border border-gray-200">
                  {[
                    { to: `/admin/mealplan`, icon: <RestaurantMenu />, label: "Meal Plan" },
                    { to: `/admin/workoutplan`, icon: <DirectionsRun />, label: "Workout Plan" },
                    { to: `/admin/supplement`, icon: <MedicalServices />, label: "Supplement" },
                  ].map(({ to, icon, label }, index, array) => (
                    <li key={to} className="px-4 py-2 hover:bg-gray-100">
                      <NavLink
                        to={to}
                        onClick={() => {
                          setActivePath(to);
                          toggleSidebar();
                        }}
                        className={`flex items-center text-sm transition ${
                          activePath === to ? "text-red-700 font-semibold" : "text-gray-700 hover:text-gray-800"
                        } ${index !== array.length - 1 ? "border-b border-gray-200" : ""}`}
                      >
                        <span className="text-lg mr-3">{icon}</span>
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileSidebar;
