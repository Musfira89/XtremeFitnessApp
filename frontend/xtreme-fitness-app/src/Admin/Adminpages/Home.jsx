import React from "react";
import SalesCard from "../Home/SalesCard"; // Assuming Analytics is the admin-related data or reports
import AnalyticsSection from "../Home/AnalyticsSection"; // Import new analytics component

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-4 mt-6 px-4 lg:px-4 h-full">
      <div className="w-full">
        <SalesCard />

      </div>

      <div className="w-full">
      <AnalyticsSection />

      </div>
    </div>
  );
};

export default Home;
