import React from "react";

const PricingPlan = () => {
  const plans = [
    {
      title: "Starter Plan",
      price: "$19",
      description: "Perfect for beginners starting their fitness journey.",
      features: [
        "Access to gym equipment",
        "1 personal training session/week",
        "Basic diet plan guidance",
        "Fitness tracking app",
        "Email support",
        "Basic diet plan guidance",
      ],
    },
    {
      title: "Pro Plan",
      price: "$49",
      description: "Ideal for enthusiasts aiming for serious progress.",
      features: [
        "Unlimited gym access",
        "3 personal training sessions/week",
        "Custom diet plan",
        "Advanced fitness tracking app",
        "Priority customer support",
        "Access to group classes (Yoga, Zumba, HIIT)",
      ],
      highlighted: true, // Black background for the middle card
    },
    {
      title: "Elite Plan",
      price: "$99",
      description: "Designed for athletes who demand the best.",
      features: [
        "24/7 gym access",
        "Dedicated personal trainer",
        "Comprehensive diet & supplement plan",
        "Advanced group classes",
        "Weekly progress check-ins",
        "VIP fitness community",
      ],
    },
  ];

  return (
        <div className="py-16 px-6 bg-white mb-10 mt-10">
          {/* Section Title */}
          <h2 className="text-center text-4xl font-bold text-red-600 mb-6">
            OUR PRICING PLAN
          </h2>
          {/* Description */}
          <p className="text-center text-gray-500 text-md mb-14">
            Choose the plan that fits your fitness goals. Whether you're starting out or looking to take<br></br> your training to the next level, we’ve got you covered.
          </p>
          {/* Pricing Cards */}
          <div className="flex flex-col md:flex-row justify-center gap-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`w-[350px] h-[550px] p-8 rounded-lg shadow-lg border ${
                  plan.highlighted
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-200"
                }`}
              >
                {/* Title */}
                <h3 className="text-2xl font-bold mb-4">
                  {plan.title}
                </h3>
                {/* Description */}
                <p
                  className={`text-sm mb-6 ${
                    plan.highlighted ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {plan.description}
                </p>
                {/* Price */}
                <p className="text-5xl font-bold mb-8">
                  {plan.price}
                </p>
                {/* Features */}
                <ul className="mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 mb-3">
                      <span className="text-green-500">✔</span>
                      <p className="text-sm">{feature}</p>
                    </li>
                  ))}
                </ul>
                {/* Subscribe Button */}
                <button
                  className={`w-full py-3 text-center font-bold rounded ${
                    plan.highlighted
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-700"
                  }`}
                >
                  Subscribe now
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default PricingPlan;