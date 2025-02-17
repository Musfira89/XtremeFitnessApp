import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import successAnimation from "../assets/success.json"; // Lottie animation

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const session_id = searchParams.get("session_id");
  const renewal = searchParams.get("renewal") === "true"; // Check if it's a renewal
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!session_id) {
      toast.error("Session ID is missing!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      navigate("/"); // Redirect to home or error page
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payment-status/${session_id}`);

        if (response.status === 200 && response.data.user?._id) {
          setUserId(response.data.user._id);

          if (renewal) {
            toast.success("Subscription Renewed Successfully!", {
              position: "top-right",
              autoClose: 3000,
              theme: "dark",
            });
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    checkPaymentStatus();
  }, [session_id, navigate, renewal]);

  const handleGoToDashboard = () => {
    toast.success("Welcome to Dashboard!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });

    if (userId) {
      navigate(`/dashboard/${userId}`);
    } else {
      navigate("/"); // Fallback if userId is not available
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 text-center px-6">
      <div className="relative bg-white p-10 rounded-3xl shadow-2xl border border-gray-300 max-w-lg w-full">
        <div className="w-24 h-24 mx-auto">
          <Lottie animationData={successAnimation} loop={false} />
        </div>
        <h2 className="text-4xl font-extrabold mt-6">Payment Successful!</h2>
        <p className="mt-3 text-lg text-gray-700">
          {renewal ? "Your subscription has been renewed!" : "Click the button below to go to your dashboard."}
        </p>
        <div className="mt-6">
          <button
            onClick={handleGoToDashboard}
            className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
