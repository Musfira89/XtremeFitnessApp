import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons
import { CircularProgress } from "@mui/material";

const Meal = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const { userId } = useParams();
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/users`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;

    const fetchMealPlan = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/response/${selectedUserId}`
        );
        if (response.data?.meals?.length > 0) {
          setMealPlan(response.data.meals);
          setSelectedDay(0);
          setError("");
        } else {
          setMealPlan([]);
          setError("No meal plan found for this user.");
        }
      } catch (err) {
        setError("Failed to load meal plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/get-mealprogress/${selectedUserId}`
        );

        console.log("Fetched progress data:", response.data); // Debugging

        // Ensure progress is always an array
        const progressData = Array.isArray(response.data) ? response.data : [];
        setUserProgress(progressData);
      } catch (error) {
        console.error("Error fetching progress:", error);
        setUserProgress([]); // Default to empty array on error
      }
    };

    // **Step 1:** Fetch Meal Plan First
    fetchMealPlan().then(() => {
      // **Step 2:** Fetch Progress Only After Meal Plan is Loaded
      fetchProgress();
    });
  }, [selectedUserId]);

  // Ensure progress is calculated after meal plan is set
  useEffect(() => {
    if (mealPlan.length === 0 || userProgress.length === 0) {
      setProgress(0);
      return;
    }

    const totalDays = mealPlan.length;
    const completedDays = userProgress.filter(
      (progress) => progress.completed
    ).length;

    setProgress(
      totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0
    );
  }, [mealPlan, userProgress]);

  const currentDay = mealPlan[selectedDay]?.day?.trim(); // Ensure no extra spaces

  const isDayCompleted = userProgress?.some(
    (progress) =>
      progress.day?.trim().toLowerCase() === currentDay?.toLowerCase() &&
      progress.completed
  );

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Users Weekly Meal plan
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-md mb-6">
        Admin can view selected user's meal plan.
      </p>
      <div className="w-full max-w-md mb-6">
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          Select User
        </label>
        <select
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Choose a User</option>
          {userData.length > 0 ? (
            userData.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName || user.name || "Unnamed User"}
              </option>
            ))
          ) : (
            <option disabled>Loading users...</option>
          )}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-red-600 font-semibold"></div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : mealPlan.length > 0 ? (
        <>
          {/* Day Selection */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {mealPlan.map((meal, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedDay === index
                    ? "bg-red-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedDay(index)}
              >
                {meal.day.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-2 mb-8 justify-start">
  <CircularProgress
    variant="determinate"
    value={progress}
    size={40}
  />
  <span className="text-gray-800 dark:text-white">{progress}%</span>
</div>


          {/* Meal Table */}
          {selectedDay !== null && (
            <div className="overflow-x-auto w-full">
              <table className="w-full table-auto border-collapse shadow-lg">
                <thead>
                  <tr className="bg-red-700 text-white text-lg">
                    <th className="p-2 sm:p-4">Meal Type</th>
                    <th className="p-4">Meal Name</th>
                    <th className="p-4">Calories</th>
                    <th className="p-4">Carbs</th>
                    <th className="p-4">Fat</th>
                    <th className="p-4">Protein</th>
                    <th className="p-4">Recipe</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(mealPlan[selectedDay])
                    .filter(([key]) => !["day", "_id"].includes(key))
                    .map(([mealType, meal], index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 hover:bg-gray-100 transition"
                      >
                        <td className="p-4 font-semibold">{mealType}</td>
                        <td className="p-4 font-semibold">{meal.name}</td>
                        <td className="p-4">{meal.calories || "N/A"} kcal</td>
                        <td className="p-4">{meal.carbs || "N/A"}g</td>
                        <td className="p-4">{meal.fat || "N/A"}g</td>
                        <td className="p-4">{meal.protein || "N/A"}g</td>
                        <td className="p-4">
                          <button
                            onClick={() => setSelectedRecipe(meal)}
                            className="text-red-600 font-semibold hover:underline"
                          >
                            View Recipe
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* Progress Button */}
              <div className="mt-4 flex justify-start w-full">
                <button
                  className={`px-6 py-2 font-semibold rounded-lg text-white ${
                    isDayCompleted ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {isDayCompleted ? (
                    <>
                      <FaCheckCircle className="inline-block mr-2" /> Completed
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="inline-block mr-2" /> Incomplete
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      ) : null}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl relative">
            <button
              className="absolute top-2 right-2 text-sm"
              onClick={() => setSelectedRecipe(null)}
            >
              ✖
            </button>
            <h3 className="text-[18px] font-semibold text-black mb-4">
              {selectedRecipe.name} - Recipe
            </h3>

            {/* Video */}
            {selectedRecipe.video ? (
              <iframe
                className="w-full h-52 rounded-md shadow-md"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  selectedRecipe.video
                )}`}
                title="Recipe Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-52 flex items-center justify-center bg-gray-200 text-gray-500 rounded-md">
                No Video Available
              </div>
            )}

            {/* Ingredients & Instructions in Flex */}
            <div className="mt-4 flex gap-2">
              {/* Ingredients */}
              <div className="flex-[2]">
                <h4 className="text-lg font-semibold mb-2">Ingredients</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {selectedRecipe.recipe?.ingredients?.length > 0
                    ? selectedRecipe.recipe.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))
                    : "No ingredients available."}
                </ul>
              </div>

              {/* Instructions */}
              <div className="flex-[2]">
                <h4 className="text-lg font-semibold mb-2">Instructions</h4>
                <ol className="list-decimal list-inside text-gray-700 text-sm">
                  {selectedRecipe.recipe?.instructions?.length > 0
                    ? selectedRecipe.recipe.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))
                    : "No instructions available."}
                </ol>
              </div>
            </div>

            {/* Nutritional Benefits */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">
                Nutritional Benefits
              </h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {selectedRecipe.recipe?.nutritional_benefits?.length > 0 ? (
                  selectedRecipe.recipe.nutritional_benefits.map(
                    (benefit, index) => <li key={index}>{benefit}</li>
                  )
                ) : (
                  <li className="text-gray-500">
                    No nutritional benefits available.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Function to extract YouTube video ID
const getYouTubeVideoId = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
  return match ? match[1] : "";
};

export default Meal;
