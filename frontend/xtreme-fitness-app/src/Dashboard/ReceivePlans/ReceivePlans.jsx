import React from "react";
import MealPlan from "./MealPlan";
import WorkoutPlan from "./WorkoutPlan";

const ReceivePlans = () => {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
      <MealPlan />
      <WorkoutPlan />
    </div>
  );
};

export default ReceivePlans;
