import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";

const Revenue = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [churnRate, setChurnRate] = useState(0);
  const [arpu, setArpu] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/total-revenue`);
        const { totalRevenue, history, churnRate, arpu } = response.data;

        setTotalRevenue(totalRevenue || 0);
        setChurnRate(churnRate || 0);
        setArpu(arpu || 0);

        const formattedData = Array.isArray(history)
          ? history.map((item) => ({
              name: item.month || "Unknown",
              revenue: item.revenue || 0, // Prevents undefined revenue values
            }))
          : [];

        setRevenueData(formattedData);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl min-h-[400px] w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <h3 className="text-2xl font-semibold text-gray-700">💰 Total Revenue</h3>
      <div className="w-full h-1 bg-gray-200 mt-2 mb-5"></div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : (
        <>
          {/* KPIs Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h4 className="text-xl font-bold text-gray-800">${totalRevenue.toLocaleString()}</h4>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Churn Rate</p>
              <h4 className={`text-xl font-bold ${churnRate > 0 ? "text-red-500" : "text-green-500"}`}>
                {Number(churnRate).toFixed(2)}%
              </h4>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">ARPU</p>
              <h4 className="text-xl font-bold text-gray-800">${Number(arpu).toFixed(2)}</h4>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="w-full h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#635BFF" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#E0E7FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={{ stroke: "#E5E7EB" }} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={{ stroke: "#E5E7EB" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    fontSize: "14px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  cursor={{ stroke: "#635BFF", strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#635BFF"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                  dot={{ r: 6, stroke: "#635BFF", strokeWidth: 2, fill: "#FFF" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Revenue;
