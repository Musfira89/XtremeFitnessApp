import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_your_public_key");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state.plan;

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/checkout-session", {
        userId: "USER_ID", // Replace with actual userId
        planId: plan._id,
      });

      window.location.href = `https://checkout.stripe.com/pay/${response.data.sessionId}`;
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Payment for {plan.name}</h2>
        <p className="text-gray-600 mb-2">{plan.priceDetails}</p>
        <p className="text-gray-800 font-semibold mb-4">${plan.price} / month</p>
        <form onSubmit={handlePayment}>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;
