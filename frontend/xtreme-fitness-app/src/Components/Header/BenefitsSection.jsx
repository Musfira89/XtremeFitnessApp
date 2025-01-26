import React from "react";
import progressionIcon from "../../assets/LandingPageImg/icon1.png"; // Replace with your actual image
import workoutIcon from "../../assets/LandingPageImg/icon2.png"; // Replace with your actual image
import nutritionIcon from "../../assets/LandingPageImg/icon3.png"; // Replace with your actual image
import confidenceIcon from "../../assets/LandingPageImg/icon4.png"; // Replace with your actual image

const BenefitsSection = () => {
  return (
    <div className="bg-gradient-to-r from-red-700 via-red-800 to-red-400 py-24 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24 text-center">
        {/* Progression */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={progressionIcon}
            alt="Progression Icon"
            className="w-16 h-16"
          />
          <h3 className="font-extrabold text-xl md:text-2xl uppercase">
            Progression
          </h3>
          <p className="text-md text-justify" style={{ letterSpacing: "normal" }}>
            Track your growth and measure your progress to achieve your goals effectively.
          </p>
        </div>
        {/* Workout */}
        <div className="flex flex-col items-center space-y-4">
          <img src={workoutIcon} alt="Workout Icon" className="w-16 h-16" />
          <h3 className="font-extrabold text-xl md:text-2xl uppercase">
            Workout
          </h3>
          <p className="text-md text-justify" style={{ letterSpacing: "normal" }}>
            Stay consistent and follow curated workout plans designed for success.
          </p>
        </div>
        {/* Nutrition */}
        <div className="flex flex-col items-center space-y-4">
          <img src={nutritionIcon} alt="Nutrition Icon" className="w-16 h-16" />
          <h3 className="font-extrabold text-xl md:text-2xl uppercase">
            Nutrition
          </h3>
          <p className="text-md text-justify" style={{ letterSpacing: "normal" }}>
            Fuel your body with the right nutrients to boost performance and health.
          </p>
        </div>
        {/* Confidence */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={confidenceIcon}
            alt="Confidence Icon"
            className="w-16 h-16"
          />
          <h3 className="font-extrabold text-xl md:text-2xl uppercase">
            Confidence
          </h3>
          <p className="text-md text-justify" style={{ letterSpacing: "normal" }}>
            Build confidence through discipline and consistent improvement in every aspect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
