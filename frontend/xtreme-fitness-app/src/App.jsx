import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Home } from "./Components/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Questionnaire from "./Questionnaire/Questionnaire";
import FitnessPrograms from "./Auth/FitnessPrograms";
import PaymentPage from "./Auth/PaymentPage";
import Dashboard from "./Dashboard/Dashboard";
// import DetailPage from "./pages/Detailpage";
// import AdminForm from "./Admin/Admin";
// import HeroSection from "./Components/Header/Header";

function App() {
  return (
      <Router>
        <Routes>
          {/* Landing Page Routes */}
          {/* <Route path="/" element={<Home />} /> */}

           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/questions" element={<Questionnaire />} />
           <Route path="/chooseprogram" element={<FitnessPrograms />} />
           <Route path="/payment" element={<PaymentPage />} />
           <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
  );
}

export default App;
