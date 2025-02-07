import stripe from "../stripe.js";
import User from "../models/auth.js";

export const stripeWebhook = async (req, res) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook Error:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const planId = session.metadata.planId;

    await User.findByIdAndUpdate(userId, {
      plan: planId,
      subscriptionStatus: "active",
    });

    console.log("User subscription activated:", userId);
  }

  res.json({ received: true });
};
