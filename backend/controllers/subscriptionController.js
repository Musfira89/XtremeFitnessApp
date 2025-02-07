import User from "../models/auth.js";
import Plan from "../models/Plan.js";
import stripe from "../stripe.js";

// Subscribe User to a Plan
export const subscribeUser = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the selected plan
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    // Update user's subscription status
    if (plan.name === "Free Plan") {
      user.plan = plan._id;
      user.subscriptionStatus = "inactive"; // Free plan users remain inactive
      await user.save();
      return res.status(200).json({ message: "Free plan activated", user });
    } else {
      user.plan = plan._id;
      user.subscriptionStatus = "pending"; // Paid plan needs payment confirmation
      await user.save();
      return res.status(200).json({ message: "Subscription pending payment", user });
    }
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Change Subscription Plan
export const changeSubscription = async (req, res) => {
  try {
    const { userId, newPlanId } = req.body;

    // Check if the new plan exists
    const newPlan = await Plan.findById(newPlanId);
    if (!newPlan) return res.status(404).json({ message: "Plan not found" });

    // Update user's plan
    const user = await User.findByIdAndUpdate(userId, 
      { plan: newPlanId }, 
      { new: true }
    ).populate("plan");  

    res.status(200).json({ message: "Subscription updated", user });
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Create Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    // Fetch user from the database
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch plan details from the database
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    // Convert price from string to integer (e.g., $899.99 to 89999)
    const priceInCents = parseFloat(plan.price.replace('$', '').replace('/month', '').trim()) * 100;

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name, // Dynamic plan name
              description: plan.priceDetails, // Dynamic plan description
            },
            unit_amount: priceInCents, // Price in cents
            recurring: {
              interval: "month", // Assuming all plans are monthly for simplicity
            },
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/payment-failed`,
      metadata: {
        userId: userId,
        planId: planId,
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Check Payment Status
export const checkPaymentStatus = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if the session was successful
    if (session.payment_status === 'paid') {
      const userId = session.metadata.userId;
      const planId = session.metadata.planId;

      // Update user's subscription status to active
      const user = await User.findByIdAndUpdate(userId, {
        plan: planId,
        subscriptionStatus: "active",
      }, { new: true });

      res.status(200).json({ message: "Payment confirmed, subscription activated", user });
    } else {
      res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
    res.status(500).json({ message: "Server error" });
  }
};