import React from "react";
import workoutImg from "../../assets/workout.jpg";
import mealPlanImg from "../../assets/mealPlan.jpg";
import scheduleImg from "../../assets/flexible.jpg";
import trackingImg from "../../assets/progress.jpg";

const FeaturesSection = () => {
    return (
      <section className="bg-white py-16 px-8 lg:px-20 mb-11">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-600 mb-4">
              OUR FEATURES
            </h2>
            <p className="text-gray-500 text-md">
              Discover how we can transform your fitness journey with our innovative services.
            </p>
          </div>
  
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
              <img
                src={workoutImg}
                alt="Personalized Workout Plans"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-base font-semibold text-black hover:text-gray-800 mb-2">
                  Personalized Workout Plans
                </h3>
                <p className="text-sm text-gray-700">
                  Tailored workout routines designed to fit your goals and fitness level.
                </p>
              </div>
            </div>
  
            {/* Feature 2 */}
            <div className="text-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
              <img
                src={mealPlanImg}
                alt="Customized Meal Plans"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-base font-semibold text-black hover:text-gray-800 mb-2">
                  Customized Meal Plans
                </h3>
                <p className="text-sm text-gray-700">
                  Nutrition plans that complement your workout and optimize results.
                </p>
              </div>
            </div>
  
            {/* Feature 3 */}
            <div className="text-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
              <img
                src={scheduleImg}
                alt="Flexible Scheduling"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-base font-semibold text-black hover:text-gray-800 mb-2">
                  Flexible Scheduling
                </h3>
                <p className="text-sm text-gray-700">
                  Schedule your workouts at your convenience to fit your lifestyle.
                </p>
              </div>
            </div>
  
            {/* Feature 4 */}
            <div className="text-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
              <img
                src={trackingImg}
                alt="Progress Tracking"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-base font-semibold text-black hover:text-gray-800 mb-2">
                  Progress Tracking
                </h3>
                <p className="text-sm text-gray-700">
                  Monitor your fitness journey and celebrate your milestones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;