import React, { useState } from "react";

const mealsData = {
  Monday: [
    {
      meal: "Breakfast",
      image: "http://news.backtotheroots.com/wp-content/uploads/2016/04/BreakfastPorridge10-1024x683.jpg", // Increased image size
      description: "Oats with milk, banana, walnuts",
      calories: 443,
      carbs: 67,
      protein: 16,
      fat: 15,
    },
    {
      meal: "Lunch",
      image: "https://media.self.com/photos/5a048a2c9b11d66dc00891cd/2:1/pass/turkey-sandwich-hummus-avocado.jpg?mbid=social_retweet", // Increased image size
      description: "Turkey sandwich with avocado and hummus",
      calories: 385,
      carbs: 53,
      protein: 26,
      fat: 11,
    },
    {
      meal: "Dinner",
      image: "https://barefeetinthekitchen.com/wp-content/uploads/2023/04/Spaghetti-Sauce-with-Ground-Beef-BFK-12-1-of-1.jpg", // Increased image size
      description: "Whole wheat pasta with tomato-basil sauce and lean ground beef",
      calories: 661,
      carbs: 57,
      protein: 41,
      fat: 32,
    },
    {
      meal: "Snack",
      image: "https://img.freepik.com/premium-photo/whole-grain-crispbread-with-tomato-cream-cheese-radish_378481-3200.jpg", // Increased image size
      description: "Whole grain crispbreads with cheese",
      calories: 140,
      carbs: 12,
      protein: 5,
      fat: 8,
    },
  ],
  Tuesday: [
    {
      meal: "Breakfast",
      image: "http://news.backtotheroots.com/wp-content/uploads/2016/04/BreakfastPorridge10-1024x683.jpg", // Increased image size
      description: "Greek yogurt with mixed berries and almonds",
      calories: 350,
      carbs: 25,
      protein: 15,
      fat: 18,
    },
    {
      meal: "Lunch",
      image: "https://www.briannas.com/wp-content/uploads/2014/03/spinach-fried-chicken-salad-header.jpg",
      description: "Chicken salad with spinach, cucumber, and olive oil",
      calories: 400,
      carbs: 10,
      protein: 40,
      fat: 20,
    },
    {
      meal: "Dinner",
      image: "https://chefjulieyoon.com/wp-content/uploads/2015/01/SalmonQuinoaAsparagus-44-2048x1365.jpg",
      description: "Salmon with roasted asparagus and quinoa",
      calories: 550,
      carbs: 35,
      protein: 45,
      fat: 25,
    },
    {
      meal: "Snack",
      image: "https://www.123homeschool4me.com/wp-content/uploads/2022/08/Easy-Appetizers-scaled-e1657111578851.jpg",
      description: "Apple slices with peanut butter",
      calories: 200,
      carbs: 25,
      protein: 5,
      fat: 10,
    },
  ],};

const WeeklyMealPlan = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [expandedMeal, setExpandedMeal] = useState(null);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Weekly Meal Plan Overview
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Follow your personalized meal plan. Meals are divided into high-carb and low-carb days.
      </p>

      {/* Weekly Overview */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {Object.keys(mealsData).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg ${
              selectedDay === day
                ? "bg-red-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            } shadow-md hover:shadow-lg`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Meals Table */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <h3 className="text-2xl font-semibold text-red-600">
          {selectedDay}'s Meals
        </h3>
        <table className="w-full mt-4 text-left">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <th className="py-4 px-6">Meal</th>
              <th className="py-4 px-6">Description</th>
              <th className="py-4 px-6">Calories</th>
              <th className="py-4 px-6">Carbs</th>
              <th className="py-4 px-6">Protein</th>
              <th className="py-4 px-6">Fat</th>
            </tr>
          </thead>
          <tbody>
            {mealsData[selectedDay].map((meal) => (
              <React.Fragment key={meal.meal}>
                <tr
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() =>
                    setExpandedMeal(expandedMeal === meal.meal ? null : meal.meal)
                  }
                >
                  <td className="py-4 px-6 flex items-center space-x-6">
                    <img
                      src={meal.image}
                      alt={meal.meal}
                      className="w-20 h-20 rounded-lg object-cover" // Increased image size
                    />
                    <span className="font-medium text-lg">{meal.meal}</span>
                  </td>
                  <td className="py-4 px-6">{meal.description}</td>
                  <td className="py-4 px-6">{meal.calories} kcal</td>
                  <td className="py-4 px-6">{meal.carbs} g</td>
                  <td className="py-4 px-6">{meal.protein} g</td>
                  <td className="py-4 px-6">{meal.fat} g</td>
                </tr>
                {expandedMeal === meal.meal && (
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td colSpan="6" className="py-4 px-6 text-gray-600 dark:text-gray-300">
                      <p>
                        <strong>Details:</strong> {meal.description}
                      </p>
                      <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500">
                        Learn More
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyMealPlan;
