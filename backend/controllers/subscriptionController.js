import User from "../models/auth.js";
import Plan from "../models/Plan.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const subscribeUser = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find selected plan
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    // Update user's subscription status
    user.plan = plan._id;
    user.subscriptionStatus = "pending"; // Awaiting payment
    await user.save();

    res.status(200).json({ message: "Subscription pending payment", user });

  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const startFreeTrial = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Start 3-day trial
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 3); // Add 3 days
    
    user.plan = null;  
    user.subscriptionStatus = "active";  
    user.trialExpiryDate = trialEndDate;
    
    await user.save();
    

    // Set a timeout to deactivate trial after 3 days
    setTimeout(async () => {
      const updatedUser = await User.findById(userId);
      if (updatedUser && updatedUser.plan === null) {
        updatedUser.subscriptionStatus = "inactive"; // Expire the trial
        await updatedUser.save();
      }
    }, 3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds

    res.status(200).json({ message: "Free trial activated for 3 days", user });

  } catch (error) {
    console.error("Free Trial Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createCheckoutSession = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);
    if (!user || !plan) return res.status(404).json({ message: "User or Plan not found" });

    // Extract numeric price from string (e.g., "$899.99/month" -> 899.99)
    const priceInDollars = parseFloat(plan.price.replace(/[^0-9.]/g, ""));
    
    if (isNaN(priceInDollars)) {
      return res.status(400).json({ message: "Invalid price format in plan" });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: plan.name },
            unit_amount: Math.round(priceInDollars * 100), // Convert to cents
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`,
      cancel_url: `http://localhost:5173/plans`,
      metadata: { userId, planId },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};



export const checkActivePlan = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const currentDate = new Date();
    if (user.planId && user.planExpiry > currentDate) {
      return res.json({ activePlanId: user.planId, planExpiry: user.planExpiry });
    }

    res.json({ activePlanId: null });
  } catch (error) {
    console.error("Error checking active plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};

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
