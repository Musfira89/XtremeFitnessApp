import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealPlan = () => {
  const { userId } = useParams(); 

  const [mealPlan, setMealPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("User ID:", userId); 

    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/response/generate-meal-plan/${userId}`);
        
        console.log("API Response:", response);

        if (response.data && response.data.mealPlan) {
          const mealPlanData = response.data.mealPlan;

          if (typeof mealPlanData === 'string') {
            const parsedMealPlan = parseMealPlan(mealPlanData);
            setMealPlan(parsedMealPlan);
          } else {
            setMealPlan(mealPlanData);
          }
        } else {
          setError("Meal plan data is empty or malformed.");
        }
      } catch (err) {
        console.error("Error fetching meal plan:", err);
        setError("Failed to load meal plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, [userId]);

  const parseMealPlan = (data) => {
    const days = data.split("\n\n");
    let structuredPlan = {};

    days.forEach((dayText) => {
      const lines = dayText.split("\n");
      if (lines.length > 1) {
        const day = lines[0].replace(/\*\*/g, ""); 
        const meals = lines.slice(1).map((line) => {
          const [mealName, description] = line.split(": ");
          return { name: mealName.replace(/\*\*/g, ""), description };
        });

        structuredPlan[day] = meals;
      }
    });

    return structuredPlan;
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Weekly Meal Plan Overview
      </h2>      
      
      {loading ? (
        <p>Loading meal plan...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-3 text-left border-b border-gray-200 dark:border-gray-600">Day</th>
              <th className="p-3 text-left border-b border-gray-200 dark:border-gray-600">Meal</th>
              <th className="p-3 text-left border-b border-gray-200 dark:border-gray-600">Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(mealPlan).map((day) => (
              <tr key={day} className="border-b border-gray-200 dark:border-gray-600">
                <td className="p-3">{day}</td>
                <td colSpan={2}>
                  <table className="w-full">
                    {mealPlan[day].map((meal, index) => (
                      <tr key={index}>
                        <td className="p-2 border-b border-gray-200 dark:border-gray-600">{meal.name}</td>
                        <td className="p-2 border-b border-gray-200 dark:border-gray-600">{meal.description}</td>
                      </tr>
                    ))}
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MealPlan;
