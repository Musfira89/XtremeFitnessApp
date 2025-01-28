import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Home } from "./LandingPage/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Questionnaire from "./Questionnaire/Questionnaire";
import PaymentPage from "./Auth/PaymentPage";
import AdminDashboard from './Admin/AdminDashboard';
import BuyCards from "./LandingPage/Product/BuyCards";
import AppRoutes from "./route";
import MealPlan from "./pages/MealPlan";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/buycards" element={<BuyCards />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/questions" element={<Questionnaire />} />
        <Route path="/payment" element={<PaymentPage />} />

        <Route path="/dashboard/*" element={<AppRoutes />} />
        
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* Toast Container */}
      <ToastContainer />
    </Router>
  );
}

export default App;
