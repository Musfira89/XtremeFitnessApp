import React from "react";
import Cards from "../Dashboard/Cards";
import Graph from "../Dashboard/Graph";
import Bot from "../Dashboard/ChatBot";
import Calendar from "../Dashboard/Calender";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 mt-6 px-4 lg:px-4 h-full">

      {/* Cards and Calendar: 70% Cards and 30% Calendar */}
      <div className="flex gap-6">
        <div className="w-[70%]">
          <Cards  />
        </div>
        <div className="w-[30%] flex flex-col justify-between">
          <Calendar />
        </div>
      </div>

      {/* Graph and ChatBot: 50% Graph, 50% ChatBot */}
      <div className="flex gap-6 mt-6 flex-grow">
        <div className="w-[70%]">
          <Graph />
        </div>
        <div className="w-[30%]">
          <Bot />
        </div>
      </div>
    </div>
  );
};

export default Home;
