
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const plans = {
  free: { name: "Free Plan", price: 0 },
  silver: { name: "Xtreme Silver", price: 89999 }, 
  gold: { name: "Xtreme Gold", price: 69999 },
  platinum: { name: "Xtreme Platinum", price: 149999 },
};


export const getPlans = (req, res) => {
  res.json({ success: true, plans });
};


export const purchasePlan = async (req, res) => {
  const { planName, email } = req.body;

  if (!plans[planName]) {
    return res.status(400).json({ success: false, message: 'Invalid plan selected' });
  }

  const selectedPlan = plans[planName];

  if (selectedPlan.price === 0) {
    // Free plan: directly grant access
    return res.json({ success: true, message: 'Free plan selected. Access granted.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPlan.name,
            },
            unit_amount: selectedPlan.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing?cancel=true`,
      customer_email: email,
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating Stripe session' });
  }
};
