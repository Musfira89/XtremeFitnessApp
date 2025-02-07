import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { session_id } = useParams(); // Session ID will be passed in the URL
  const userId = new URLSearchParams(window.location.search).get('userId'); // Extract userId from URL

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payment-status/${session_id}`);
        if (response.status === 200) {
          // Redirect to the dashboard after successful subscription
          navigate(`/dashboard/${userId}`);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    checkPaymentStatus(); // Polling after payment success
  }, [session_id, userId, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-green-600 text-2xl font-bold">Payment Successful!</h2>
        <p className="text-gray-600">Checking payment status...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
