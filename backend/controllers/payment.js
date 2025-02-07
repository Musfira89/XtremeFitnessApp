import Stripe from 'stripe';
import User from '../models/auth.js';
import Plan from '../models/Plan.js';

const stripe = new Stripe('your_stripe_secret_key'); // Replace with your Stripe secret key

// Create Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    // Find the selected plan
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // Change this based on your currency
            product_data: {
              name: plan.name, // Name of the plan
            },
            unit_amount: plan.price * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Session Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
