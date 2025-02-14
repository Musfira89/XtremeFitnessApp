import React from "react";
import Cards from "../Dashboard/Cards";
import Graph from "../Dashboard/Progress";
import Bot from "../Dashboard/ChatBot";
import Calendar from "../Dashboard/Calender";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 mt-6 px-4 lg:px-6 h-full">
      
      {/* Cards and Calendar Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cards - Full width on small screens, 70% on large screens */}
        <div className="w-full lg:w-[70%]">
          <Cards />
        </div>

        {/* Calendar - Full width on small screens, 30% on large screens */}
        <div className="w-full lg:w-[30%] flex flex-col justify-between">
          <Calendar />
        </div>
      </div>

      {/* Graph and ChatBot Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 flex-grow">
        {/* Graph - Full width on small screens, 70% on large screens */}
        <div className="w-full lg:w-[70%]">
          <Graph />
        </div>

        {/* ChatBot - Full width on small screens, 30% on large screens */}
        <div className="w-full lg:w-[30%]">
          <Bot />
        </div>
      </div>
    </div>
  );
};

export default Home;
