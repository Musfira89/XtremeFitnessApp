import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealPlan = () => {
  const { userId } = useParams();
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  // Array of days to map to the day buttons
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/response/generate-meal-plan/${userId}`
        );

        if (response.data && response.data.meals) {
          setMealPlan(response.data.meals);
          setSelectedDay(0); // Default to first day's meals
        } else {
          setError("Meal plan data is empty or malformed.");
        }
      } catch (err) {
        setError("Failed to load meal plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMealPlan();
  }, [userId]);

  const openRecipePage = (recipe) => {
    // Open recipe in a new window or display as you prefer
    window.open(recipe, "_blank");
  };

  return (
    <div className="p-6 bg-white dark:bg-black text-black dark:text-white rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-6 text-center">Weekly Meal Plan</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-red-600"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : (
        <>
          <div className="flex justify-center space-x-4 mb-6">
            {mealPlan.map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedDay === index ? "bg-red-600 text-white" : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"}`}
                onClick={() => setSelectedDay(index)}
              >
                {daysOfWeek[index]} {/* Display day names */}
              </button>
            ))}
          </div>
          {selectedDay !== null && (
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-red-600 text-white text-lg">
                  <th className="p-4">Meal</th>
                  <th className="p-4">Meal Name</th>
                  <th className="p-4">Calories</th>
                  <th className="p-4">Carbs</th>
                  <th className="p-4">Protein</th>
                  <th className="p-4">Recipe</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(mealPlan[selectedDay]).map(([mealType, meal], index) => (
                  <tr key={index} className="border-b border-gray-300 dark:border-gray-700 even:bg-gray-100 odd:bg-white dark:even:bg-gray-900 dark:odd:bg-gray-800">
                    <td className="p-4 flex items-center space-x-2">
                      <img
                        src="https://via.placeholder.com/50"
                        alt={meal.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <span className="font-semibold">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</span>
                    </td>
                    <td className="p-4 font-semibold">{meal.name}</td>
                    <td className="p-4">{meal.calories ? `${meal.calories} kcal` : "N/A"}</td>
                    <td className="p-4">{meal.carbs ? `${meal.carbs}g` : "N/A"}</td>
                    <td className="p-4">{meal.protein ? `${meal.protein}g` : "N/A"}</td>
                    <td className="p-4">
                      <button
                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                        onClick={() => openRecipePage(meal.recipe)} // Open the recipe in a new tab
                      >
                        Recipe
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default MealPlan;
