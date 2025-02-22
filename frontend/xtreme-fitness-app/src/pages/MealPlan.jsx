import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealPlan = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { userId } = useParams();
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedGrocery, setSelectedGrocery] = useState(null);

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

  const getYouTubeVideoId = (url) => {
    if (!url || typeof url !== "string") return null; // Handle null, undefined, or non-string values

    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );

    return match ? match[1] : null;
  };

  const extractGroceryList = (recipeInstructions) => {
    if (!recipeInstructions) return [];
  
    // Ensure instructions are in string format
    const instructionsString = Array.isArray(recipeInstructions)
      ? recipeInstructions.join(" ") // Convert array to a single string
      : recipeInstructions;
  
    if (typeof instructionsString !== "string") {
      console.warn("Expected string, received:", instructionsString);
      return [];
    }
  
    return instructionsString
      .split(/[\n,.]/) // Split by new lines, commas, or periods
      .map((line) =>
        line
          .replace(/(\d+[\-\/]?\s?[a-zA-Z]*)|[*()%]/g, "") // Remove numbers but keep units
          .replace(
            /\b(grill|serve|top|combine|cook|mix|chop|slice|mince|drizzle|sprinkle|bake|roast|boil|sauté|stir|pour|garnish|add|blend|heat|spread|whisk|season|before|after|during|into|onto|over|under|inside|outside|in|on|at|with|without|from|to|for|by|and|or|while|when|until|till|afterward|prior|serving|as|well)\b/gi,
            ""
          ) // Remove cooking actions and unnecessary words
          .replace(/\s{2,}/g, " ") // Remove extra spaces
          .trim()
      )
      .filter((line) => line.length > 2) // Ignore empty or small words
      .flatMap((line) => line.split(/\s+and\s+/)); // Handle multiple ingredients in a single line
  };
  

  const saveGroceryList = (list) => {
    if (!list.length) {
      alert("No items to save!");
      return;
    }

    console.log("Grocery List Saved:", list);
    setShowPopup(true); // Show popup message

    setTimeout(() => {
      setShowPopup(false); // Hide popup after 1 sec
      setSelectedGrocery(null); // Close modal
    }, 1000);
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
                    <th className="p-2 sm:p-4">Fat</th>
                    <th className="p-2 sm:p-4">Protein</th>
                    <th className="p-2 sm:p-4">Recipe</th>
                    <th className="p-2 sm:p-4">Grocery List</th>
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
                            {meal.fat || "N/A"}g
                          </td>
                          <td className="p-2 sm:p-4 text-xs sm:text-base">
                            {meal.protein || "N/A"}g
                          </td>
                          <td className="p-2 sm:p-4">
                            <button
                              onClick={() => setSelectedRecipe(meal)}
                              className="text-red-600 text-xs sm:text-base font-semibold hover:underline"
                            >
                              View Recipe
                            </button>
                          </td>
                          <td className="p-2 sm:p-4">
                            <button
                              onClick={() => setSelectedGrocery(meal)}
                              className="text-red-600 text-xs sm:text-base font-semibold hover:underline"
                            >
                              View List
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-2xl shadow-2xl max-w-4xl w-full relative transition-all ease-in-out duration-300 transform scale-100 font-serif">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-700 dark:text-white text-2xl font-semibold hover:text-red-500 transition-transform transform hover:scale-110"
              onClick={() => setSelectedRecipe(null)}
            >
              ✖
            </button>

            {/* Title */}
            <h3 className="text-3xl font-semibold text-red-700 dark:text-white text-center mb-8">
              {selectedRecipe.name} - Recipe
            </h3>

            {/* Scrollable Content */}
            <div className="max-h-[80vh] overflow-y-auto p-2 space-y-8 text-base sm:text-lg leading-relaxed">
              {/* Video or Placeholder */}
              {selectedRecipe.video ? (
                <iframe
                  className="w-full h-60 sm:h-96 rounded-xl shadow-lg"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    selectedRecipe.video
                  )}`}
                  title="Recipe Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-60 sm:h-96 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-xl shadow-lg text-lg font-medium">
                  No Video Available
                </div>
              )}

              {/* Ingredients */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-4 uppercase">
                  Ingredients
                </h4>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {selectedRecipe.recipe?.ingredients?.map(
                    (ingredient, index) => (
                      <li key={index} className="ml-4 list-disc">
                        {ingredient}
                      </li>
                    )
                  ) || <li>No ingredients available.</li>}
                </ul>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-4 uppercase">
                  Instructions
                </h4>
                <ol className="space-y-4 text-gray-700 dark:text-gray-300">
                  {selectedRecipe.recipe?.instructions?.map(
                    (instruction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-8 h-8 flex items-center justify-center bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 font-bold rounded-full mr-4">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    )
                  ) || <li>No instructions available.</li>}
                </ol>
              </div>

              {/* Nutritional Benefits */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-4 uppercase">
                  Nutritional Benefits
                </h4>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {selectedRecipe.recipe?.nutritional_benefits?.map(
                    (benefit, index) => (
                      <li key={index} className="ml-4 list-disc">
                        {benefit}
                      </li>
                    )
                  ) || <li>No nutritional benefits available.</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grocery List Modal */}
      {selectedGrocery && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-2 transition-opacity duration-300"
          onClick={() => setSelectedGrocery(null)}
        >
          <div
            className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl max-w-[30%] w-full relative transform transition-all scale-95 hover:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-700 dark:text-white text-xl font-bold hover:text-red-500 transition-transform transform hover:rotate-90"
              onClick={() => setSelectedGrocery(null)}
            >
              ✕
            </button>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
              Grocery List for{" "}
              <span className="text-red-600">{selectedGrocery.name}</span>
            </h3>

            {/* Scrollable Grocery List */}
            <div className="max-h-[50vh] overflow-y-auto p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-inner">
              <ul className="list-disc pl-5 text-gray-800 dark:text-gray-300 text-xs sm:text-sm space-y-1">
                {extractGroceryList(selectedGrocery.recipe.instructions).map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 text-xs sm:text-sm rounded-md hover:bg-gray-300 transition"
                onClick={() => setSelectedGrocery(null)}
              >
                Close
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 text-xs sm:text-sm rounded-md hover:bg-red-700 transition"
                onClick={() =>
                  saveGroceryList(
                    extractGroceryList(selectedGrocery.recipe.instructions)
                  )
                }
              >
                Save List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Message */}
      {showPopup && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 text-sm rounded-md shadow-lg transition-opacity duration-300">
          Grocery list saved successfully!
        </div>
      )}
    </div>
  );
};

export default MealPlan;
