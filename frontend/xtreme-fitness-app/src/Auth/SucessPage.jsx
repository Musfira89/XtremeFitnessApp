import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import successAnimation from "../assets/success.json"; // Lottie animation

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const session_id = new URLSearchParams(window.location.search).get("session_id");
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
          setUserId(response.data.user._id); // Store user ID for navigation
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    checkPaymentStatus();
  }, [session_id, navigate]);

  // Function to handle "Go to Dashboard" button click
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center px-6">
      <div className="relative bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-700 max-w-lg w-full">
        <div className="w-24 h-24 mx-auto">
          <Lottie animationData={successAnimation} loop={false} />
        </div>
        <h2 className="text-4xl font-extrabold text-white mt-6">Payment Successful!</h2>
        <p className="mt-3 text-lg text-gray-300">Click the button below to go to your dashboard.</p>
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
