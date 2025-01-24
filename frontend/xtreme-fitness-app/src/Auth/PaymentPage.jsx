import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const handlePlanSelection = (plan) => {
    if (plan === "Free Trial") {
      navigate("/dashboard");
    } else {
      setSelectedPlan(plan);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-500 text-white flex flex-col items-center justify-between px-6 py-8">
      {/* Step Progress */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white text-red-600 font-bold rounded-full flex items-center justify-center">
            1
          </div>
          <span className="ml-3 text-sm font-bold">Choose Plan</span>
        </div>
        <div className="w-full h-1 bg-white mx-3 flex-1"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-400 text-white font-bold rounded-full flex items-center justify-center">
            2
          </div>
          <span className="ml-3 text-sm">Payment</span>
        </div>
        <div className="w-full h-1 bg-gray-400 mx-3 flex-1"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-white font-bold rounded-full flex items-center justify-center">
            3
          </div>
          <span className="ml-3 text-sm">Confirmation</span>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {["Free Trial", "Premium", "Pro"].map((plan, index) => (
          <div
            key={index}
            className={`p-8 rounded-lg text-center cursor-pointer ${
              plan === "Premium"
                ? "bg-red-600 text-white border-4 border-white"
                : "bg-white text-red-600"
            }`}
            onClick={() => handlePlanSelection(plan)}
          >
            <h3 className="text-2xl font-bold">{plan}</h3>
            <ul className="mt-4 text-sm space-y-2">
              {plan === "Free Trial" && (
                <>
                  <li>7 Days Access</li>
                  <li>Basic Features</li>
                  <li>No Payment Required</li>
                </>
              )}
              {plan === "Premium" && (
                <>
                  <li>Unlimited Workouts</li>
                  <li>Exclusive Content</li>
                  <li>Priority Support</li>
                </>
              )}
              {plan === "Pro" && (
                <>
                  <li>Personalized Plans</li>
                  <li>1-on-1 Coaching</li>
                  <li>Advanced Analytics</li>
                </>
              )}
            </ul>
            <div className="text-3xl font-extrabold mt-6">
              {plan === "Free Trial" ? "$0" : plan === "Premium" ? "$29.99" : "$49.99"}
            </div>
            <button
              className={`mt-6 w-full py-3 ${
                plan === "Premium" ? "bg-white text-red-600" : "bg-red-600 text-white"
              } font-bold rounded-lg transition hover:bg-opacity-90`}
            >
              {plan === "Free Trial" ? "Start Trial" : `Choose ${plan}`}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Section */}
      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-full max-w-2xl bg-white text-red-600 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-bold mb-4">Secure Payment for {selectedPlan}</h3>
          <p className="text-sm text-gray-700 mb-6">
            Pay with confidence. We use industry-standard encryption to keep your payment safe.
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Expiry Date"
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            />
            <input
              type="text"
              placeholder="CVV"
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            />
          </div>
          <button className="mt-6 w-full py-3 bg-red-600 text-white font-bold rounded-lg transition hover:bg-opacity-90">
            Pay Now
          </button>
        </motion.div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-100">
        Secure payments with Stripe and PayPal. No hidden fees.
      </div>
    </div>
  );
};

export default PaymentPage;
