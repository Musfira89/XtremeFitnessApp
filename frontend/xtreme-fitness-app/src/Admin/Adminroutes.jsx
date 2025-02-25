import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Home/AdminLayout";
import Home from "./Adminpages/Home";
import QuestionResponse from "./Adminpages/QuestionResponse";
import Meeting from "./Adminpages/Meeting";
import AdminProfile from "./Adminpages/AdminProfile";
import User from "./Adminpages/User"
import Settings from "./Adminpages/Settings"
import Feedback from "./Adminpages/Feedback";
import Meal from "./Adminpages/Meal"
import Workout from "./Adminpages/Workout"
import Supplements from "./Adminpages/Supplements"
import Progress from "./Adminpages/UserProgress"

const AdminRoutes = () => (
  <Routes>
    {/* Parent Layout with Sidebar and Topbar */}
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="userlist" element={<User />} />
      <Route path="questionaire" element={<QuestionResponse />} />
      <Route path="meeting" element={<Meeting />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="userprogress" element={<Progress />} />

      <Route path="profilepage" element={<AdminProfile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="mealplan" element={<Meal />} />
      <Route path="workoutplan" element={<Workout />} />
      <Route path="supplement" element={<Supplements />} />

    </Route>
  </Routes>
);

export default AdminRoutes;
