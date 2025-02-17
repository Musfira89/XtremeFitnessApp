import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Home } from "./LandingPage/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Questionnaire from "./Auth/Questionnaire";
import BuyCards from "./LandingPage/Product/BuyCards";
import AppRoutes from "./route";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminLogin from "./Admin/AdminLogin/AdminLogin";
import Adminroutes from "./Admin/Adminroutes";
import AdminSignup from "./Admin/AdminLogin/AdminSignup";
import PlanPage from "./Auth/PlanPage";
import Journey from "./LandingPage/Journey/Journey";
import PaymentSuccess from "./Auth/SucessPage";
import Trainer from "./LandingPage/Blog/Trainer";
import Policy from "./Auth/Policy";
import Terms from "./Auth/Terms";
import Feedback from "./pages/Feedback/Feedback";
import RenewPlan from "./Auth/RenewPlan"
function App() {
  return (
    <AuthProvider>
          <AdminAuthProvider>
      <Router>
        <Routes>
          {/* Landing Page Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/buycards" element={<BuyCards />} />
          <Route path="/success-stories" element={<Journey />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/terms&conditions" element={<Terms />} />
          <Route path="/privacy" element={<Policy />} />

          {/* User Panel Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/questions/:userId" element={<Questionnaire />} />
          <Route path="/planpage/:userId" element={<PlanPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/feedback/:userId" element={<Feedback />} />
          <Route path="/renew-plan" element={<RenewPlan />} />

          <Route path="/dashboard/:userId/*" element={<AppRoutes />} />

          {/* Admin Panel Routes */}
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Adminroutes />} />
        </Routes>

        {/* Toast Container */}
        <ToastContainer />
      </Router>
      </AdminAuthProvider>

    </AuthProvider>
  );
}

export default App;
