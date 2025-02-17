import React from "react";
import { CheckCircle } from "lucide-react";
import freePlanImage from "../../assets/free.jpeg"; // Replace with actual image paths
import basicPlanImage from "../../assets/basic.png";
import proPlanImage from "../../assets/pro.png";
import { Link } from "react-router-dom";

const PricingPlans = () => {
  const plans = [
    {
      name: "Xtreme Silver",
      price: "$899.99/month",
      priceDetails: "Billed monthly until cancelled",
      image: freePlanImage,
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
      price: "$499.99/month",
      priceDetails: (
        <div className="text-gray-600  ">
          <p className="text-white"> $1499.99 / 3 months</p>
          <p className="text-white">
            Save $1200 Billed every 3 months until cancelled.
          </p>
        </div>
      ),
      image: basicPlanImage,
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
    {
      name: "Xtreme Gold",
      price: "$699.99/month",
      priceDetails: (
        <div className="text-gray-600 ">
          <p className="text-red-500"> $1399.99 / 2 months</p>
          <p className="text-red-500">
            Save $400 Billed every 2 months until cancelled.
          </p>
        </div>
      ),
      image: proPlanImage,
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

  return (
    <div
      id="pricing"
      className="flex flex-col justify-center items-center w-full px-4 md:px-10 py-10 mt-16 mb-28"
    >
      {/* Heading */}
      <div className="text-center mb-24">
        <h1 className="text-4xl font-bold text-black">OUR PRICING PLANS</h1>
        <div className="mt-2 h-1 w-24 bg-red-700 mx-auto"></div>
      </div>

      {/* Pricing Plans */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`w-full md:w-1/4 p-5 flex flex-col items-center text-center rounded-xl border border-gray-300 shadow-md bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg
              ${
                index === 1
                  ? "md:w-1/4 bg-gradient-to-br from-red-600 to-red-800 text-white shadow-xl transform scale-105 border-2 border-red-500"
                  : ""
              }`}
          >
            {/* Plan Name */}
            <h2
              className={`text-lg font-bold ${
                index === 1 ? "text-white" : "text-gray-900"
              }`}
            >
              {plan.name}
            </h2>

            {/* Price */}
            <p
              className={`text-2xl font-extrabold mt-2 ${
                index === 1 ? "text-white" : "text-gray-900"
              }`}
            >
              {plan.price}
            </p>

            {/* Price Details */}
            <p
              className={`text-sm mt-2 ${
                index === 1 ? "text-white" : "text-red-500"
              }`}
            >
              {plan.priceDetails}
            </p>

            {/* Features */}
            <ul className="mt-4 space-y-2 w-full">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 ${
                    index === 1 ? "text-white" : "text-gray-700"
                  }`}
                >
                  <CheckCircle
                    className={`${
                      index === 1 ? "text-white" : "text-gray-500"
                    } w-4 h-4`}
                  />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Buy Button */}
            <Link to="/signup">
              <button
                className={`mt-5 px-5 py-2 text-sm font-semibold rounded-md transition ${
                  index === 1
                    ? "bg-white text-red-700 hover:bg-gray-100"
                    : "bg-red-700 text-white hover:bg-red-800"
                }`}
              >
                Buy Plan
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
