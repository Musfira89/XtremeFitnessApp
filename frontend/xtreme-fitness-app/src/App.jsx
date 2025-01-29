import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Home } from "./LandingPage/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Questionnaire from "./Auth/Questionnaire";
import PaymentPage from "./Auth/PaymentPage";
import BuyCards from "./LandingPage/Product/BuyCards";
import AppRoutes from "./route";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./Admin/AdminLogin/AdminLogin";
import Adminroutes from "./Admin/Adminroutes";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/buycards" element={<BuyCards />} />

          {/* User Panel Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/questions/:userId" element={<Questionnaire />} />
          <Route path="/payment/:userId" element={<PaymentPage />} />
          <Route path="/dashboard/:userId/*" element={<AppRoutes />} />

          {/* Admin Panel Routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Adminroutes />} />
        </Routes>

        {/* Toast Container */}
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
