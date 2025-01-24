import React from "react";
import Sidebar from "./Asidebar";
import Topbar from "./Atopbar";
import UserList from "./UserList";  // Import UserList component
import ViewQuestionnaire from "./ViewQuestionnaire"; // Import ViewQuestionnaire component
import Analytics from "./Analytics"; // Import Analytics component

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - fixed height with full viewport height */}
      <Sidebar className="h-screen" />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-8 space-y-8 overflow-auto">
          {/* UserList Section with full width */}
          <div className="w-full">
            <UserList />  {/* Add UserList component here */}
          </div>

          {/* Row of two sections with 50% width each */}
          <div className="flex space-x-4">
            {/* ViewQuestionnaire Section with 50% width */}
            <div className="w-full md:w-1/2">
              <ViewQuestionnaire />  {/* Add ViewQuestionnaire component here */}
            </div>
            {/* Analytics Section with 50% width */}
            <div className="w-full md:w-1/2">
              <Analytics />  {/* Add Analytics component here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
