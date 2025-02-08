import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealPlan = () => {
  const { userId } = useParams();
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    console.log("User ID passed to API:", userId);

    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/response/${userId}`
        );
        console.log("API Response:", response.data);

        if (response.data?.meals) {
          setMealPlan(response.data.meals);
          setSelectedDay(0);

          // Store images in localStorage
          response.data.meals.forEach((meal, index) => {
            Object.entries(meal).forEach(([key, value]) => {
              if (value?.image) {
                localStorage.setItem(`${userId}_meal_${index}_${key}_image`, value.image);
              }
            });
          });
        } else {
          setError("Meal plan data is empty or malformed.");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load meal plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, [userId]);

  return (
    <div
      className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-xl transition-all"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
       <header className="text-center mb-16 mt-7">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Weekly Meal Plan
        </h2>
        <p className="text-lg text-gray-700 mt-2">
          Your customized plan for the week
        </p>

      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-40">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-red-600"></div>
          <p className="text-lg font-semibold text-red-700 mt-4">
            Loading your meal plan...
          </p>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : (
        <>
          {/* Days Selection */}
          <div className="flex justify-center flex-wrap gap-4 mb-10">
            {mealPlan.map((meal, index) => (
              <button
                key={index}
                className={`px-6 py-2 text-md rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
                  selectedDay === index
                    ? "bg-red-700 text-white"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => setSelectedDay(index)}
              >
                {meal.day.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Meals Table */}
          {selectedDay !== null && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg text-lg shadow-md">
                <thead>
                  <tr className="bg-red-700 text-white text-xl">
                    <th className="p-4">Meal</th>
                    <th className="p-4">Meal Name</th>
                    <th className="p-4">Calories</th>
                    <th className="p-4">Carbs</th>
                    <th className="p-4">Protein</th>
                    <th className="p-4">Recipe</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(mealPlan[selectedDay])
                    .filter(([key]) => !["day", "_id"].includes(key))
                    .map(([mealType, meal], index) => {
                      const imageSrc =
                        meal.image ||
                        localStorage.getItem(`${userId}_meal_${selectedDay}_${mealType}_image`) ||
                        "https://via.placeholder.com/70";

                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-300 dark:border-gray-700 even:bg-gray-100 odd:bg-white dark:even:bg-gray-900 dark:odd:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                        >
                          <td className="p-4 flex items-center space-x-4">
                            <img
                              src={imageSrc}
                              alt={meal.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <span className="font-semibold text-md">
                              {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                            </span>
                          </td>
                          <td className="p-4 font-semibold">{meal.name}</td>
                          <td className="p-4">{meal.calories ? `${meal.calories} kcal` : "N/A"}</td>
                          <td className="p-4">{meal.carbs ? `${meal.carbs}g` : "N/A"}</td>
                          <td className="p-4">{meal.protein ? `${meal.protein}g` : "N/A"}</td>
                          <td className="p-4">
                            <button
                              className="bg-red-700 text-white text-sm px-8 py-3 rounded-lg hover:bg-red-700 shadow-md hover:shadow-lg transition-all"
                              onClick={() => {
                                setSelectedRecipe(meal.recipe);
                                setSelectedImage(imageSrc);
                              }}
                            >
                              Recipe
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4 text-center">
              Recipe Details
            </h3>
            <div className="flex flex-col items-center">
              <img
                src={selectedImage}
                alt="Recipe Image"
                className="w-48 h-48 object-cover rounded-lg mb-4"
              />
            </div>
            <ul className="text-gray-800 dark:text-gray-300 list-disc pl-6 space-y-2">
              {selectedRecipe.split("\n").map((step, index) => (
                <li key={index} className="text-lg">
                  {step}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-md hover:shadow-lg transition-all"
                onClick={() => setSelectedRecipe(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlan;
