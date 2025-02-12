import React from "react";
import { ArrowUpward } from "@mui/icons-material";

const cardData = [
  {
    title: "Total Revenue",
    value: "$78,452",
    change: "+5.67%",
    changeColor: "text-green-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "New Subscriptions",
    value: "1,234",
    change: "+2.45%",
    changeColor: "text-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Top Selling Plan",
    value: "Xtreme Platinum",
    change: "+3.12%",
    changeColor: "text-green-500",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Active Users",
    value: "8,567",
    change: "-0.34%",
    changeColor: "text-red-500",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

const DashboardOverview = () => {
  return (
    <div className="max-w-7xl mx-auto bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md flex items-center"
          >
            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${card.iconBg}`}
            >
              <ArrowUpward className={`text-3xl ${card.iconColor}`} />
            </div>

            {/* Text Content */}
            <div className="ml-5">
              <h3 className="text-lg font-bold text-gray-800 font-sans">
                {card.value}
              </h3>
              <p className="text-sm text-gray-500 font-sans">{card.title}</p>
              <p className={`text-xs font-bold ${card.changeColor} mt-2`}>
                {card.change} Last month
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
