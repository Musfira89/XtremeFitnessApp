import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Asidebar";
import Topbar from "./Atopbar";
import MobileSidebar from "../Mobile/MobileNav";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track mobile sidebar state

  useEffect(() => {
    console.log("Admin Panel Loaded");
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Desktop Sidebar */}
      <div className={`w-72 hidden md:block transition-all`}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col w-full md:w-auto"
        style={{ transition: "margin-left 0.3s" }}
      >
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />{" "}
        {/* Pass toggleSidebar to Topbar */}
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
