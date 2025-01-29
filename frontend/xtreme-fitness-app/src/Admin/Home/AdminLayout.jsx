import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Asidebar";
import Topbar from "./Atopbar";

const Layout = () => {
  const [isSidebarOpen] = useState(true);

  useEffect(() => {
    console.log("Admin Panel Loaded");
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div
        className="flex-1 flex flex-col "
        style={{
          transition: "margin-left 0.3s", // Smooth transition for sidebar
        }}
      >
        <Topbar />

        <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <Outlet /> {/* Renders the nested routes/components */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
