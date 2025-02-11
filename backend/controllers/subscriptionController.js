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
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/plans`,
      metadata: { userId, planId },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: "Payment initiation failed" });
  }
};
