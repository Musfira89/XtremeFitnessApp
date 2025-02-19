import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Dashboard/Layout";

import Home from "./pages/Home";
import ProgressTracking from "./pages/Progress/ProgressTracking";
import Meal from "./pages/MealPlan";
import Workout from "./pages/WorkoutPlan";
import ProfilePage from "./pages/ProfilePage";
import Supplements from "./pages/Supplements";
import Meeting from "./pages/Meeting/Meeting";
import Settings from "./pages/Settings"
import ProgressUpload from "./pages/ProgressUpload";
import ProgressTable from "./pages/ProgressTable";
const AppRoutes = () => (
  <Routes>
    {/* Parent Layout with Sidebar and Topbar */}
    <Route path="/" element={<Layout />}>
      {/* Default Route (Dashboard Home) */}
      <Route index element={<Home />} />

      {/* Nested Routes for Dashboard with userId */}
      <Route path="mealPlan" element={<Meal />} />
      <Route path="workoutPlan" element={<Workout />} />
      <Route path="supplements" element={<Supplements />} />
      <Route path="progress-tracking" element={<ProgressTracking />} />
      <Route path="profilepage" element={<ProfilePage />} />
      <Route path="settingspage" element={<Settings />} />
      <Route path="meeting" element={<Meeting />} />
      <Route path="progress" element={<ProgressUpload />} />

    </Route>
  </Routes>
);

export default AppRoutes;
