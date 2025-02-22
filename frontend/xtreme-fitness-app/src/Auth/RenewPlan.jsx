import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const RenewPlan = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const planId = searchParams.get("planId");
  const [planPrice, setPlanPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState("");

  // Fetch the plan price based on planId
  useEffect(() => {
    const fetchPlanPrice = async () => {
      if (planId) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/plans/get`);
          console.log("API Response:", response.data);
          const plan = response.data.find((plan) => plan._id === planId);
          if (plan && plan.price) {
            const priceString = plan.price.replace(/[^0-9.-]+/g, ""); // Remove non-numeric characters
            const price = Number(priceString); // Convert string to number
            if (isNaN(price)) {
              console.error("Invalid price received:", plan.price);
            } else {
              setPlanPrice(price);
            }
          } else {
            console.error("Plan not found or missing price field.");
          }
        } catch (error) {
          console.error("Error fetching plan price:", error);
        }
      }
    };

    fetchPlanPrice();
  }, [planId]);

  // Create checkout session once plan price is fetched
  useEffect(() => {
    if (userId && planId && planPrice !== null) {
      setLoading(true);
      const discountedPrice = Math.round(planPrice * 0.9 * 100); // Convert discounted price to cents
      console.log("Plan Price:", planPrice);
      console.log("Discounted Price (in cents):", discountedPrice); // Log the discounted price
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/api/create-renewal-session`, {
          userId,
          planId,
          discountedPrice, // Send the discounted price in cents
        })
        .then((res) => {
          setCheckoutUrl(res.data.url);
          console.log("Checkout URL:", res.data.url); // Log the checkout URL
        })
        .catch((err) => {
          console.error("Error creating checkout session:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [userId, planId, planPrice]);

  // Handle redirect to Stripe Checkout
  const handleCheckoutRedirect = () => {
    if (checkoutUrl) {
      // Redirect to the Stripe Checkout session page
      window.location.href = checkoutUrl;  // This will redirect the user to Stripe's checkout page
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : checkoutUrl ? (
        <button onClick={handleCheckoutRedirect} className="btn btn-primary">
          Proceed to Checkout
        </button>
      ) : (
        <p>Error: Unable to create a renewal session</p>
      )}
    </div>
  );
};

export default RenewPlan;
