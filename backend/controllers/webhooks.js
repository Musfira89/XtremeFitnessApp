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
        // Set plan expiry date (1 month from now)
        const planExpiryDate = new Date();
        planExpiryDate.setMonth(planExpiryDate.getMonth() + 1);

        // Update user subscription details
        await User.findByIdAndUpdate(userId, { 
          plan: planId, 
          subscriptionStatus: "active",
          planExpiry: planExpiryDate
        });

        console.log(`User ${userId} subscription activated until ${planExpiryDate}!`);
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
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session.metadata || !session.metadata.userId) {
      return res.status(400).json({ message: "User ID missing in metadata" });
    }

    if (session.payment_status === "paid") {
      const { userId, planId } = session.metadata;
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
