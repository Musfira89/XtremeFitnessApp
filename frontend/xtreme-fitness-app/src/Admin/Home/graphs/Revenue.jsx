import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Revenue = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState(0);
  const [churnRate, setChurnRate] = useState(0);
  const [arpu, setArpu] = useState(0);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/total-revenue"
        );
        const { totalRevenue, revenueChange, history, churnRate, arpu } =
          response.data;

        setTotalRevenue(totalRevenue);
        setRevenueChange(revenueChange);
        setChurnRate(churnRate);
        setArpu(arpu);

        const formattedData = history.map((item) => ({
          name: item.month,
          revenue: item.revenue,
        }));

        setRevenueData(formattedData);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl">
      {/* Heading Section */}
      <h3
        className="text-2xl font-semibold text-gray-600"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        💰 Total Revenue
      </h3>
      <div className="w-full h-1 bg-gray-200 mt-2 mb-5"></div>{" "}
      {/* Line with space below */}
      {/* KPIs Section */}
      <div className="grid grid-cols-3 gap-6 text-center mb-6">
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <h4 className="text-xl font-bold text-gray-800">
            ${totalRevenue.toLocaleString()}
          </h4>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Churn Rate</p>
          <h4
            className={`text-xl font-bold ${
              Number(churnRate) > 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {Number(churnRate).toFixed(2)}%
          </h4>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">ARPU</p>
          <h4 className="text-xl font-bold text-gray-800">
  ${Number(arpu).toFixed(2)}
</h4>
        </div>
      </div>
      {/* Revenue Graph */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={revenueData}
          margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="name" tick={{ fill: "#4B5563", fontSize: 12 }} />
          <YAxis tick={{ fill: "#4B5563", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "14px",
            }}
          />

          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#635BFF" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#E0E7FF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#635BFF"
            strokeWidth={3}
            fill="url(#colorRevenue)"
            dot={{ r: 5, fill: "#635BFF" }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Revenue;
