import React from "react";
import TotalRevenueGraph from "../Home/graphs/Revenue";
import TotalUsersGraph from "../Home/graphs/TotalUsers";
import DiscountsGraph from "../Home/graphs/Discounts"; // Covers both Referral & Renewal
import FreeTrialGraph from "../Home/graphs/TrialUsers";

const AnalyticsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-6">
      {/* Total Revenue Graph - 60% width */}
      <div className="p-4 bg-white shadow-md rounded-lg col-span-3">
        <TotalRevenueGraph />
      </div>

      {/* Total Users Graph - 40% width */}
      <div className="p-4 bg-white shadow-md rounded-lg col-span-2">
        <TotalUsersGraph />
      </div>



      {/* 3-Day Free Trial Graph */}
      {/* <div className="p-4 bg-white shadow-md rounded-lg col-span-3 lg:col-span-3">
        <FreeTrialGraph />
      </div> */}
    </div>
  );
};

export default AnalyticsSection;
