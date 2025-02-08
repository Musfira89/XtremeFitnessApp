import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ChatBot from "../Dashboard/ChatBot"; // Import the ChatBot

const Layout = () => {
  const { userId } = useParams(); // Access the userId from the route parameter
  const [isSidebarOpen] = useState(true); // Sidebar remains open

  useEffect(() => {
    // Optionally, you can fetch user data based on the userId here
    console.log("Current userId:", userId);
  }, [userId]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar userId={userId} />

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
          {/* Global Chatbot (Visible on Every Page) */}
      <ChatBot />
      </div>
    </div>
  );
};

export default Layout;
