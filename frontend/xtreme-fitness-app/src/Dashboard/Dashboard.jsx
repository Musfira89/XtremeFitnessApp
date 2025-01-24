import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ReceivePlans from "./ReceivePlans/ReceivePlans";
import TrackProgress from "./TrackProgress/TrackProgress";
import ProfileCard from "./ProfileCard";  // Assuming you have the ProfileCard component

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - fixed height with full viewport height */}
      <Sidebar className="h-screen" />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-8 space-y-8 overflow-auto">
          {/* Top Section: Receive Plans and Profile Card */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Receive Plans, now with decreased size */}
            <div className="bg-white rounded-lg shadow-lg p-4 col-span-2">
              <ReceivePlans />
            </div>

            {/* Profile Card on the right, taking full height */}
            <div className="bg-white rounded-lg shadow-lg p-6 col-span-1 h-full">
              <ProfileCard />
            </div>
          </div>

          {/* Bottom Section: Track Progress below Receive Plans */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Track Progress below Receive Plans */}
            <div className="bg-white rounded-lg shadow-lg p-6 col-span-2">
              <TrackProgress />
            </div>

            {/* Empty column for spacing on the right */}
            <div className="col-span-1"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
