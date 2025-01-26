import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./Components/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Questionnaire from "./Questionnaire/Questionnaire";
import PaymentPage from "./Auth/PaymentPage";
import Dashboard from "./Dashboard/Dashboard";
import AdminDashboard from './Admin/AdminDashboard'

function App() {
  return (
      <Router>
        <Routes>
          {/* Landing Page Routes */}
          <Route path="/" element={<Home />} />

           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/questions" element={<Questionnaire />} />
           <Route path="/payment" element={<PaymentPage />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/admin" element={<AdminDashboard />} />

        </Routes>
      </Router>
  );
}

export default App;
