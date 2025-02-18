import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import fitnessBackground from "../assets/LandingPageImg/service1.png";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const PlanPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/plans/get");
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, [userId,plans]);

  const handleTrialEnable = async () => {
    console.log("User ID:", userId); // Debugging
    
    try {
      const response = await axios.post("http://localhost:5000/api/start-trial", { userId });
      console.log("Trial Response:", response.data); // Debugging
  
      toast.success("Free trial activated! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
  
      setTimeout(() => navigate(`/dashboard/${userId}`), 3000);
    } catch (error) {
      console.error("Axios Error:", error); // Full error logging
      toast.error(error.response?.data?.message || "Error enabling free trial", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  

  const handlePlanSelection = async (plan) => {
    // Ensure activePlan is loaded before checking
    if (activePlan && activePlan.activePlanId === plan._id) {
      toast.error(`You already have this plan! It expires on ${new Date(activePlan.planExpiry).toLocaleDateString()}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/checkout-session", {
        userId,
        planId: plan._id,
      });
  
      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };
  
  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-between px-6 py-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${fitnessBackground})` }}
    >
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white text-red-600 font-bold rounded-full flex items-center justify-center">1</div>
          <span className="ml-3 text-sm font-bold">Choose Plan</span>
        </div>
        <div className="w-full h-1 bg-white mx-3 flex-1"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-400 text-white font-bold rounded-full flex items-center justify-center">2</div>
          <span className="ml-3 text-sm">Payment</span>
        </div>
        <div className="w-full h-1 bg-gray-400 mx-3 flex-1"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-white font-bold rounded-full flex items-center justify-center">3</div>
          <span className="ml-3 text-sm">Confirmation</span>
        </div>
      </div>

      {/* Free Trial Enable Button */}
      <button
        className="mb-8 px-12 py-3 bg-red-800 text-white font-semibold uppercase rounded-md hover:bg-red-700 transition"
        onClick={handleTrialEnable}
      >
        Enable Free Trial
      </button>

      {/* Paid Plans */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full px-4 md:px-10 py-10 mt-6 mb-4">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="w-full md:w-[28%] flex flex-col items-center text-center bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <h2 className="text-2xl font-bold text-black mt-4">{plan.name}</h2>
            <p className="text-4xl font-extrabold text-black mt-2">{plan.price}</p>
            <p className="text-xs text-red-500 mt-4 mb-2">{plan.priceDetails}</p>
            <ul className="mt-4 space-y-2 px-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-600 flex items-center gap-2">
                  <CheckCircle className="text-gray-400 w-5 h-5" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="mt-6 mb-6 px-12 py-2 bg-red-700 text-white font-semibold uppercase rounded-md hover:bg-red-800 transition"
              onClick={() => handlePlanSelection(plan)}
            >
              Buy Plan
            </button>
          </div>
        ))}
      </div>

      <div className=" text-center text-sm text-gray-100">
        Secure payments with Stripe . No hidden fees.
      </div>
    </div>
  );
};

export default PlanPage;
