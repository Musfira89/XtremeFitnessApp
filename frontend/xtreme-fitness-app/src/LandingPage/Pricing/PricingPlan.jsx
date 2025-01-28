import React from "react";
import { CheckCircle } from "lucide-react";
import freePlanImage from "../../assets/free.jpeg"; // Replace with actual image paths
import basicPlanImage from "../../assets/basic.png";
import proPlanImage from "../../assets/pro.png";

const PricingPlans = () => {
  const plans = [
    {
      name: "Xtreme Silver",
      price: "$899.99/",
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
      price: "$499.99/",
      priceDetails: (
        <div className="text-gray-600  ">
          <p className="text-red-500"> $1499.99 / 3 months</p>
          <p className="text-red-500">Save $1200 Billed every 3 months until cancelled.</p>
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
        <div className="text-gray-600 ">
          <p className="text-red-500"> $1399.99 / 2 months</p>
          <p className="text-red-500">Save $400 Billed every 2 months until cancelled.</p>
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
    <div className="flex flex-col justify-center items-center w-full px-4 md:px-10 py-10 mt-16 mb-28">
      {/* Heading */}
      <div className="text-center mb-28">
        <h1 className="text-4xl font-bold text-black">OUR PRICING PLAN</h1>
        <div className="mt-2 h-1 w-24 bg-red-700 mx-auto"></div>
      </div>
  
      {/* Pricing Plans */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full">
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
            <button className="mt-6 mb-6 px-12 py-2 bg-red-700 text-white font-semibold uppercase rounded-md hover:bg-red-800 transition">
              Buy Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default PricingPlans;
