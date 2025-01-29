import React from "react";
import UserList from "../Home/UserList";  // Assuming this is the admin-specific component
import Cards from "../Home/Card";  // You may need to modify this for admin
import Analytics from "../Home/Analytics";  // Assuming Analytics is the admin-related data or reports

const Home = () => {
  return (
<div className="w-full flex flex-col gap-4 mt-6 px-4 lg:px-4 h-full">

      <div className="w-full">
        <UserList /> {/* Full width for user list or management */}
      </div>

      <div className="flex gap-6 mt-6 flex-grow">
        <div className="w-[50%]">
          <Cards /> 
        </div>
        <div className="w-[50%]">
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default Home;
