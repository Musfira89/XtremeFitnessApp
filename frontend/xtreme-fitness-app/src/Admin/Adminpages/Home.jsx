import React from "react";
import Cards from "../Home/Card"; // You may need to modify this for admin
import SalesCard from "../Home/SalesCard"; // Assuming Analytics is the admin-related data or reports

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-4 mt-6 px-4 lg:px-4 h-full">
      <div className="w-full">
        <SalesCard />

      </div>

      <div className="w-full">
        <Cards />
      </div>
    </div>
  );
};

export default Home;
