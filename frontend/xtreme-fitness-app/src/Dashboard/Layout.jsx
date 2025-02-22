import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ChatBot from "../Dashboard/ChatBot";
import ResponsiveNav from "./Mobile/ResponsiveNav"; // Import ResponsiveNav

const Layout = () => {
  const { userId } = useParams(); // Access the userId from the route parameter
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    console.log("Current userId:", userId);
  }, [userId]);

  // Toggle function to control sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <ResponsiveNav userId={userId} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex h-screen">
        {/* Sidebar for Larger Screens */}
        <div className="hidden md:block w-72">
          <Sidebar userId={userId} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col transition-all w-full md:w-auto">
          {/* Topbar with toggleSidebar function */}
          <Topbar toggleSidebar={toggleSidebar} />

          {/* Content Area */}
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
            <Outlet />
          </div>

          {/* ChatBot */}
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default Layout;
