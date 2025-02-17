import stripe from "../stripe.js";
import User from "../models/auth.js";
import Plan from "../models/Plan.js"; 

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { userId, planId } = session.metadata;

      try {
        // Fetch plan details
        const plan = await Plan.findById(planId);
        if (!plan) {
          console.error("Plan not found in webhook.");
          return res.status(400).json({ message: "Plan not found" });
        }

        // Calculate plan expiry date based on durationWeeks
        const planExpiryDate = new Date();
        planExpiryDate.setDate(planExpiryDate.getDate() + (plan.durationWeeks * 7));

        // Update user subscription details
        await User.findByIdAndUpdate(userId, {
          plan: planId,
          subscriptionStatus: "active",
          planExpiry: planExpiryDate,
          subscriptionActivatedAt: new Date(), // Track activation date
        });

        console.log(
          `User ${userId} subscription activated until ${planExpiryDate}!`
        );
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


export const createRenewalCheckoutSession = async (userId, planId, discountedPrice) => {
  try {
    const user = await User.findById(userId);
    
    // Ensure the user exists and is not a free trial user
    if (!user || user.isTrialUser) {
      throw new Error("Free trial users are not eligible for renewal discounts.");
    }

    // Ensure the user has an active plan
    if (!user.plan || user.subscriptionStatus !== 'active') {
      throw new Error("User does not have an active subscription.");
    }

    // Convert userId and planId to strings to avoid the hash issue
    const stringUserId = userId.toString();
    const stringPlanId = planId.toString();

    // Apply 10% discount on the plan price
    const priceString = user.plan.price.replace(/[^0-9.-]+/g, ""); // Remove non-numeric characters
    const originalPrice = Number(priceString);
    const discountedPriceInCents = Math.round(originalPrice * 0.9 * 100); // 10% discount in cents

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: user.plan.name,  // Use plan name instead of plan ID
            },
            unit_amount: discountedPriceInCents, // Use the discounted price in cents
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}&userId=${stringUserId}&renewal=true`,
      cancel_url: `http://localhost:5173/plans`,
      metadata: { userId: stringUserId, planId: stringPlanId, renewal: true }, // Metadata with planId
    });

    // Return the Stripe checkout session URL
    return { url: session.url };

  } catch (error) {
    console.error("Error creating renewal checkout session:", error);
    throw error;
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
      const { userId, planId, renewal } = session.metadata;
      const user = await User.findById(userId);

      if (user) {
        const plan = await Plan.findById(planId);
        if (!plan) return res.status(400).json({ message: "Plan not found" });

        if (renewal === "true") {
          // Renewal case: extend current plan expiry date
          console.log(`Renewing plan for user: ${userId}`);
          user.planExpiry.setDate(user.planExpiry.getDate() + (plan.durationWeeks * 7));
        } else {
          // New subscription case
          console.log(`Assigning new plan to user: ${userId}`);
          user.plan = planId;
          user.subscriptionStatus = "active";
          user.planExpiry = new Date();
          user.planExpiry.setDate(user.planExpiry.getDate() + (plan.durationWeeks * 7));
        }

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

