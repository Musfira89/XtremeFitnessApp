import React from "react";
import { CheckCircle } from "lucide-react";
import freePlanImage from "../../assets/free.jpeg"; // Replace with actual image paths
import basicPlanImage from "../../assets/basic.png";
import proPlanImage from "../../assets/pro.png";

const PricingPlans = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      image: freePlanImage,
      features: [
        "Basic support",
        "Limited access",
        "Community help",
        "No ads",
        "Basic analytics",
      ],
    },
    {
      name: "Basic",
      price: "$120",
      image: basicPlanImage,
      features: [
        "Priority support",
        "Full access",
        "Custom options",
        "Ad-free experience",
        "Advanced analytics",
        "Access to exclusive content",
      ],
    },
    {
      name: "Pro",
      price: "$250",
      image: proPlanImage,
      features: [
        "Dedicated support",
        "Unlimited access",
        "Advanced tools",
        "Personalized coaching",
        "Complete analytics",
        "Early access to features",
        "Custom branding options",
      ],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full px-4 md:px-10 py-10 mt-16 mb-28">
      {plans.map((plan, index) => (
        <div
          key={index}
          className="w-full md:w-[28%] flex flex-col items-center text-center bg-white shadow-lg shadow-red-200 border border-gray-200 rounded-lg overflow-hidden"
        >
          <img
            src={plan.image}
            alt={`${plan.name} Plan`}
            className="w-full aspect-[4/3] object-cover"
          />

          {/* Plan Name */}
          <h2 className="text-2xl font-bold mt-4">{plan.name}</h2>
          {/* Price */}
          <p className="text-4xl font-extrabold mt-2">{plan.price}</p>
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
          <button className="mt-6 mb-6 px-6 py-2 bg-red-700 text-white font-semibold uppercase rounded-md hover:bg-red-800 transition">
            Buy Plan
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;
