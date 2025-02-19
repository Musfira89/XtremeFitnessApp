import React from "react";
import { NavLink } from "react-router-dom";
import { Home, MenuBook, VideoCall, AccountCircle, Close } from "@mui/icons-material";
import logo from "../../../public/Logo.png";
import { useAdminAuth } from "../../context/AdminAuthContext";
import defaultProfileImage from "../../assets/Default.png";
import axios from "axios";

const MobileSidebar = ({ isOpen, toggleSidebar }) => {
  const { adminAuth } = useAdminAuth();
  const [adminData, setAdminData] = React.useState(null);

  React.useEffect(() => {
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
              { to: `/admin/userlist`, icon: <VideoCall />, label: "User List" },
              { to: `/admin/meeting`, icon: <VideoCall />, label: "Meeting + Chats" },
              { to: `/admin/feedback`, icon: <VideoCall />, label: "User Feedback" },
              { to: `/admin/profilepage`, icon: <AccountCircle />, label: "Profile" },
              { to: `/admin/settings`, icon: <AccountCircle />, label: "Settings" },
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
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileSidebar;
