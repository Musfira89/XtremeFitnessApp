import React from "react";
import { ArrowUpward } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";

const DashboardOverview = () => {
  const [newSubscriptions, setNewSubscriptions] = useState(0);
  const [change, setChange] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState(0);
  const [topPlan, setTopPlan] = useState(null);
  const [subscribers, setSubscribers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [previousUsers, setPreviousUsers] = useState(0);


  useEffect(() => {
    const fetchNewSubscriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/new-subscriptions"
        );
        setNewSubscriptions(response.data.newSubscriptions);
        setChange(response.data.change);
      } catch (error) {
        console.error("Error fetching new subscriptions:", error);
      }
    };

    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/total-revenue");
        setTotalRevenue(response.data.totalRevenue);
        setRevenueChange(response.data.revenueChange);

      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };

    const fetchTopSellingPlan = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/top-selling-plan");
        setTopPlan(response.data.topPlan);
        setSubscribers(response.data.subscribers);
      } catch (error) {
        console.error("Error fetching top-selling plan:", error);
      }
    };

    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/active-users");
        setPreviousUsers(activeUsers); // Store previous count before updating
        setActiveUsers(response.data.activeUsers);
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    
    fetchActiveUsers();
    fetchTopSellingPlan();
    fetchTotalRevenue();
    fetchNewSubscriptions();
  }, []);

  const changePercentage = previousUsers
  ? (((activeUsers - previousUsers) / previousUsers) * 100).toFixed(2) + "%"
  : "0%";

  const cardData = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      change: `${revenueChange}%`,
      changeColor: revenueChange >= 0 ? "text-green-500" : "text-red-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "New Subscriptions",
      value: newSubscriptions,
      change: `${change}%`,
      changeColor: change >= 0 ? "text-green-500" : "text-red-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Top Selling Plan",
      value: topPlan ? `${topPlan}` : "No Data",
      change: `${subscribers} Subscribers`,
      changeColor: "text-green-500",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Active Users",
      value: activeUsers,
    change: changePercentage,
    changeColor: activeUsers >= previousUsers ? "text-green-500" : "text-red-500",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="p-5 lg:p-6 bg-white rounded-2xl shadow-lg flex items-center"
          >
            {/* Icon Container */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${card.iconBg}`}
            >
              <ArrowUpward className={`text-4xl ${card.iconColor}`} />
            </div>
  
            {/* Text Content */}
            <div className="ml-5">
              <h3 className="text-xl font-semibold text-gray-900 font-inter">
                {card.value}
              </h3>
              <p className="text-sm text-gray-500 font-inter">{card.title}</p>
              <p className={`text-xs font-medium ${card.changeColor} mt-2`}>
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
