import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = () => {
  const [isSidebarOpen] = useState(true); // Sidebar remains open

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col ml-72"
        style={{
          transition: "margin-left 0.3s",
        }}
      >
        {/* Topbar */}
        <Topbar />

        {/* Content Area */}
        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
