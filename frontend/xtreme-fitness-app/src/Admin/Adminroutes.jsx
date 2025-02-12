import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Home/AdminLayout";
import Home from "./Adminpages/Home";
import QuestionResponse from "./Adminpages/QuestionResponse";
import Meeting from "./Adminpages/Meeting";
import AdminProfile from "./Adminpages/AdminProfile";
import User from "./Adminpages/User"
const AdminRoutes = () => (
  <Routes>
    {/* Parent Layout with Sidebar and Topbar */}
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="userlist" element={<User />} />
      <Route path="questionaire" element={<QuestionResponse />} />
      <Route path="meeting" element={<Meeting />} />
      <Route path="profilepage" element={<AdminProfile />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
