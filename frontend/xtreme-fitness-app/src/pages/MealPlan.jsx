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

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/response/${userId}`
        );
        if (response.data?.meals) {
          setMealPlan(response.data.meals);
          setSelectedDay(0);
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
  const getImageFromLocalStorage = (mealId) => {
    return localStorage.getItem(`meal_image_${mealId}`) || "";
  };
  const saveImageToLocalStorage = (mealId, imageUrl) => {
    if (imageUrl) {
      localStorage.setItem(`meal_image_${mealId}`, imageUrl);
    }
  };

  const getYouTubeVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-xl transition-all">
      <header className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold">
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
          {/* Day Selection Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            {mealPlan.map((meal, index) => (
              <button
                key={index}
                className={`px-4 sm:px-6 py-2 text-sm sm:text-md rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
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

          {/* Table for Meals */}
          {selectedDay !== null && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse text-xs sm:text-xs shadow-md">
                <thead>
                  <tr className="bg-red-700 text-white text-xs sm:text-lg">
                    <th className="p-2 sm:p-4">Meal</th>
                    <th className="p-2 sm:p-4">Meal Name</th>
                    <th className="p-2 sm:p-4">Calories</th>
                    <th className="p-2 sm:p-4">Carbs</th>
                    <th className="p-2 sm:p-4">Protein</th>
                    <th className="p-2 sm:p-4">Recipe</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(mealPlan[selectedDay])
                    .filter(([key]) => !["day", "_id"].includes(key))
                    .map(([mealType, meal], index) => {
                      const videoId = getYouTubeVideoId(meal.video);
                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-300 dark:border-gray-700 even:bg-gray-100 odd:bg-white dark:even:bg-gray-900 dark:odd:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                        >
                          <td className="p-2 sm:p-4 font-semibold flex items-center space-x-2 sm:space-x-3">
                            <img
                              src={
                                getImageFromLocalStorage(meal.id) ||
                                meal.image ||
                                "fallback-image.jpg"
                              }
                              alt={meal.name}
                              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg shadow-md"
                            />

                            <span className="text-xs sm:text-base break-words whitespace-normal">
                              {mealType}
                            </span>
                          </td>
                          <td className="p-2 sm:p-4 font-semibold text-xs sm:text-base break-words whitespace-normal">
                            {meal.name}
                          </td>
                          <td className="p-2 sm:p-4 text-xs sm:text-base">
                            {meal.calories || "N/A"} kcal
                          </td>
                          <td className="p-2 sm:p-4 text-xs sm:text-base">
                            {meal.carbs || "N/A"}g
                          </td>
                          <td className="p-2 sm:p-4 text-xs sm:text-base">
                            {meal.protein || "N/A"}g
                          </td>
                          <td className="p-2 sm:p-4">
                            {videoId ? (
                              <button
                                onClick={() => setSelectedRecipe(meal)}
                                className="text-red-600 text-xs sm:text-base font-semibold hover:underline"
                              >
                                View Recipe
                              </button>
                            ) : (
                              <span className="text-gray-500 text-xs sm:text-base">
                                No Video
                              </span>
                            )}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-10">
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-lg shadow-xl max-w-3xl w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-700 dark:text-white text-lg sm:text-2xl font-bold"
              onClick={() => setSelectedRecipe(null)}
            >
              ×
            </button>

            <h3 className="text-lg sm:text-xl font-bold text-gray-700 text-center mb-4 sm:mb-6">
              {selectedRecipe.name} - Recipe
            </h3>

            <iframe
              className="w-full h-52 sm:h-80 rounded-lg"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                selectedRecipe.video
              )}`}
              title="Recipe Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-300 mt-4 sm:mt-6 mb-2">
              Ingredients & Instructions:
            </h4>
            <ul className="list-disc pl-4 sm:pl-6 text-gray-800 dark:text-gray-300 text-sm sm:text-base">
              {selectedRecipe.recipe
                ? selectedRecipe.recipe
                    .split("\n")
                    .map((line, index) => <li key={index}>{line}</li>)
                : "No recipe available."}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlan;
