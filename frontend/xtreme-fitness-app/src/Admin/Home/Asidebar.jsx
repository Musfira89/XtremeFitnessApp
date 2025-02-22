import React, { useState , useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, MenuBook, VideoCall, AccountCircle } from "@mui/icons-material";
import logo from "../../../public/Logo.png";
import { useAdminAuth } from "../../context/AdminAuthContext";
import defaultProfileImage from "../../assets/Default.png"; // Default image
import axios from "axios";


const Sidebar = () => {
  const [activePath, setActivePath] = useState(""); // State to track active path
  const location = useLocation();
  const { adminAuth } = useAdminAuth();
  const [adminData, setAdminData] = useState(null);


  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);


  // Fetch admin details
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (!adminAuth.adminId) return;
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/${adminAuth.adminId}`);
        setAdminData(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, [adminAuth.adminId]);

  // Construct profile image URL
  const profileImageUrl = adminData?.profileImage
    ? `${import.meta.env.VITE_API_BASE_URL}/${adminData.profileImage.replace(/\\/g, "/")}`
    : defaultProfileImage;



  return (
    <aside className="w-72 bg-gray-50 shadow-lg flex flex-col font-sans">
      {/* Logo Section */}
      <div className="flex flex-col items-center py-8 border-b">
        <img src={logo} alt="Logo" className="w-32 h-auto object-contain" />
      </div>

      
        {/* Profile Section */}
        <div className="flex flex-col items-center text-red-700 rounded-lg py-4 mb-2">
        <img
          src={profileImageUrl}
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover mb-2 border-4 border-red-800"
        />
        <h2 className="font-bold text-xl text-red-800">{adminData?.fullName || "Loading..."}</h2>
        <p className="text-sm text-red-700">{adminData?.email || "Loading..."}</p>
      </div>


      {/* Navigation Menu */}
      <nav className="px-6 py-2 flex-grow">
        <ul className="space-y-2">
          {[
            { to: `/admin`, icon: <Home />, label: "Home" },
            {
              to: `/admin/questionaire`,
              icon: <MenuBook />,
              label: "Question Responses",
            },
            {
              to: `/admin/userlist`,
              icon: <VideoCall />,
              label: "User List",
            },
            {
              to: `/admin/meeting`,
              icon: <VideoCall />,
              label: "Meeting + chats",
            },
            {
              to: `/admin/feedback`,
              icon: <VideoCall />,
              label: "User feedback",
            },
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
                onClick={() => setActivePath(to)} // Update active path on click
                className={`flex items-center space-x-4 text-sm px-4 py-2 transition ${
                  activePath === to
                    ? "text-red-700 font-semibold"
                    : "text-gray-700 hover:text-gray-800"
                }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="relative ">
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
