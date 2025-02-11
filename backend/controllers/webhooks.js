import stripe from "../stripe.js";
import User from "../models/auth.js";

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { userId, planId } = session.metadata;
    
      try {
        await User.findByIdAndUpdate(userId, { plan: planId, subscriptionStatus: "active" });
        console.log(`User ${userId} subscription activated!`);
      } catch (dbError) {
        console.error("Database Update Error:", dbError);
      }
    }
    
    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook Error:", error);
    res.sendStatus(400);
  }
};
export const checkPaymentStatus = async (req, res) => {
  try {
    const { session_id } = req.params;

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      // Retrieve user from metadata
      const { userId, planId } = session.metadata;

      // Update user subscription status in DB
      const user = await User.findById(userId);
      if (user) {
        user.plan = planId;
        user.subscriptionStatus = "active";
        await user.save();
      }

      return res.status(200).json({ message: "Payment successful", user });
    } else {
      return res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
    res.status(500).json({ message: "Server error" });
  }
};