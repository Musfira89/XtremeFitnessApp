import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import fitnessBackground from "../assets/LandingPageImg/service1.png"; // Replace with a fitness-related image

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Xtreme Silver",
      price: "$899.99/",
      priceDetails: "Billed monthly until cancelled",
      features: [
        "1 on 1 coaching",
        "Customized Workout Plan",
        "Customized Meal Plan",
        "Supplement Recommendations",
        "Weekly Email Check ins",
        "Progress Tracking",
        "Ongoing Support & Communication",
        "Referral Discounts",
      ],
    },
    {
      name: "Xtreme Platinum",
      price: "$499.99/",
      priceDetails: (
        <div className="text-gray-600">
          <p className="text-red-500"> $1499.99 / 3 months</p>
          <p className="text-red-500">Save $1200 Billed every 3 months until cancelled.</p>
        </div>
      ),
      features: [
        "1 on 1 coaching",
        "Customized Workout Plan",
        "Customized Meal Plan",
        "Supplement Recommendations",
        "Weekly Email Check ins",
        "Progress Tracking",
        "Ongoing Support & Communication",
        "Referral Discounts",
        "Renewal Discounts",
        "1 Video meeting (20 -30 minutes)",
      ],
    },
    {
      name: "Xtreme Gold",
      price: "$699.99/",
      priceDetails: (
        <div className="text-gray-600">
          <p className="text-red-500"> $1399.99 / 2 months</p>
          <p className="text-red-500">Save $400 Billed every 2 months until cancelled.</p>
        </div>
      ),
      features: [
        "1 on 1 coaching",
        "Customized Workout Plan",
        "Customized Meal Plan",
        "Supplement Recommendations",
        "Weekly Email Check ins",
        "Progress Tracking",
        "1 Video meeting (20 -30 minutes)",
        "Ongoing Support & Communication",
        "Referral Discounts",
        "Renewal Discounts",
      ],
    },
  ];

  // Navigate to /dashboard when a plan is selected
  const handlePlanSelection = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-between px-6 py-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${fitnessBackground})` }}
    >
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
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full px-4 md:px-10 py-10 mt-16 mb-28">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="w-full md:w-[28%] flex flex-col items-center text-center bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Plan Name */}
            <h2 className="text-2xl font-bold text-black mt-4">{plan.name}</h2> {/* Adjusted color */}
            {/* Price */}
            <p className="text-4xl font-extrabold text-black mt-2">{plan.price}</p> {/* Adjusted color */}
            {/* Price Details */}
            <p className="text-sm text-red-500 mt-4 mb-2">{plan.priceDetails}</p>
            {/* Features */}
            <ul className="mt-4 space-y-2 px-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-600 flex items-center gap-2">
                  <CheckCircle className="text-gray-400 w-5 h-5" />
                  {feature}
                </li>
              ))}
            </ul>
            {/* Buy Button */}
            <button
              className="mt-6 mb-6 px-12 py-2 bg-red-700 text-white font-semibold uppercase rounded-md hover:bg-red-800 transition"
              onClick={handlePlanSelection} // Trigger navigation when clicked
            >
              Buy Plan
            </button>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-12">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase">
              Step Progress
            </span>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase">
              60% Completed
            </span>
          </div>
          <div className="flex mb-2">
            <div className="relative flex w-full mb-2 items-center justify-between">
              <div className="flex-grow h-1 bg-gray-200">
                <div className="h-1 bg-red-600" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </div>
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
