import User from "../models/auth.js";
import Plan from "../models/Plan.js";

import stripe from "../stripe.js";
import moment from "moment";


export const getNewSubscriptions = async (req, res) => {
    try {
      const currentDate = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
  
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  
      // Count new subscriptions for the current month
      const currentMonthSubscriptions = await User.countDocuments({
        subscriptionStatus: "active",
        updatedAt: { $gte: lastMonth, $lt: currentDate }
      });
  
      // Count new subscriptions for the previous month
      const previousMonthSubscriptions = await User.countDocuments({
        subscriptionStatus: "active",
        updatedAt: { $gte: twoMonthsAgo, $lt: lastMonth }
      });
  
      // Calculate percentage change
      let percentageChange = 0;
      if (previousMonthSubscriptions > 0) {
        percentageChange = ((currentMonthSubscriptions - previousMonthSubscriptions) / previousMonthSubscriptions) * 100;
      } else if (currentMonthSubscriptions > 0) {
        percentageChange = 100; // If last month had no subscriptions, it's a 100% increase
      }
  
      res.status(200).json({ 
        newSubscriptions: currentMonthSubscriptions,
        change: percentageChange.toFixed(2) // Limit to 2 decimal places
      });
  
    } catch (error) {
      console.error("Error fetching new subscriptions:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

  export const getTotalRevenue = async (req, res) => {
    try {
      const startOfCurrentMonth = moment().startOf("month").unix();
      const startOfLastMonth = moment().subtract(1, "month").startOf("month").unix();
      const endOfLastMonth = moment().subtract(1, "month").endOf("month").unix();
  
      // Fetch payments for current month
      const currentMonthPayments = await stripe.paymentIntents.list({
        created: { gte: startOfCurrentMonth },
        limit: 100,
      });
  
      // Fetch payments for last month
      const lastMonthPayments = await stripe.paymentIntents.list({
        created: { gte: startOfLastMonth, lt: endOfLastMonth },
        limit: 100,
      });
  
      // Calculate revenue
      const totalRevenue = currentMonthPayments.data
        .filter((payment) => payment.status === "succeeded")
        .reduce((sum, payment) => sum + payment.amount_received, 0);
  
      const lastMonthRevenue = lastMonthPayments.data
        .filter((payment) => payment.status === "succeeded")
        .reduce((sum, payment) => sum + payment.amount_received, 0);
  
      // Calculate percentage change in revenue
      const revenueChange =
        lastMonthRevenue > 0
          ? ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
          : 0;
  
      // 🟢 Fetch total active users for ARPU calculation
      const totalUsers = await User.countDocuments({ isActive: true });
  
      // Calculate ARPU (Avoid division by zero)
      const arpu = totalUsers > 0 ? totalRevenue / totalUsers : 0;
  
      // 🟢 Fetch churned users from last month
      const churnedUsers = await User.countDocuments({
        lastActiveAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
        isActive: false, // Users who were active last month but not this month
      });
  
      // Calculate Churn Rate (Avoid division by zero)
      const churnRate = totalUsers > 0 ? (churnedUsers / totalUsers) * 100 : 0;
  
      res.status(200).json({
        totalRevenue: (totalRevenue / 100).toFixed(2),
        revenueChange: revenueChange.toFixed(2),
        arpu: arpu ? arpu.toFixed(2) : "0.00",  // Ensure ARPU is always a number
        churnRate: churnRate ? churnRate.toFixed(2) : "0.00", // Ensure churnRate is always a number
        history: [
          { month: "Last Month", revenue: lastMonthRevenue / 100 },
          { month: "Current Month", revenue: totalRevenue / 100 },
        ],
      });
      
    } catch (error) {
      console.error("Error fetching total revenue:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  export const getTopSellingPlan = async (req, res) => {
    try {
      // Aggregate users by plan and count them
      const planCounts = await User.aggregate([
        { $match: { subscriptionStatus: "active", plan: { $ne: null } } }, // Only active subscriptions with a valid plan
        { $group: { _id: "$plan", count: { $sum: 1 } } }, // Group by plan and count subscribers
        { $sort: { count: -1 } }, // Sort by count in descending order
        { $limit: 1 }, // Get the top plan
      ]);
  
      if (planCounts.length === 0) {
        return res.status(200).json({ topPlan: null, subscribers: 0 });
      }
  
      // Get the plan details (name) using the ID
      const topPlan = await Plan.findById(planCounts[0]._id);
  
      if (!topPlan) {
        return res.status(200).json({ topPlan: null, subscribers: 0 });
      }
  
      res.status(200).json({ topPlan: topPlan.name, subscribers: planCounts[0].count });
    } catch (error) {
      console.error("Error fetching top-selling plan:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const getActiveUsersCount = async (req, res) => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
      const activeUsers = await User.countDocuments({
        lastLogin: { $gte: sevenDaysAgo },
      });
  
      console.log("Active users count:", activeUsers); // Debugging purpose
  
      res.status(200).json({ activeUsers });
    } catch (error) {
      console.error("Error fetching active users count:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const getTrialUsersGrowth = async (req, res) => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // Get last 30 days data
  
      const trialUsers = await User.aggregate([
        {
          $match: {
            trialExpiryDate: { $gte: startDate } // Users who had a trial in the last 30 days
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$trialExpiryDate" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } } // Sort by date ascending
      ]);
  
      res.status(200).json(trialUsers);
    } catch (error) {
      console.error("Error fetching trial users growth:", error);
      res.status(500).json({ message: "Server error" });
    }
  };