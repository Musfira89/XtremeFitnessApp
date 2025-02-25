import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlayCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Workout = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const getYouTubeThumbnail = (url) => {
    const videoId = url?.split("v=")[1]?.split("&")[0];
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : null;
  };

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

    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/generate-workout-plan/${selectedUserId}`
        );
        setWorkoutPlan(response.data?.workoutPlan || {});
        setActiveDay(
          Object.keys(response.data?.workoutPlan?.weeklyWorkoutPlan || {})[0]
        );
      } catch (error) {
        console.error("Error fetching workout plan:", error);
        setWorkoutPlan({});
      } finally {
        setLoading(false);
      }
    };

    const fetchProgress = async () => {
      try {
        // Fetch workout plan for total exercises count
        const planResponse = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/generate-workout-plan/${selectedUserId}`
        );
        const plan = planResponse.data?.workoutPlan || {};

        let totalExercises = 0;
        Object.values(plan.weeklyWorkoutPlan || {}).forEach((exercises) => {
          totalExercises += exercises.length;
        });

        // Fetch user progress
        const progressResponse = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/get-progress/${selectedUserId}`
        );
        const progressData = progressResponse.data?.progress || [];

        let completedCount = 0;
        let progressMap = {}; // ✅ New progress mapping

        progressData.forEach((entry) => {
          entry.exercises.forEach((exercise, index) => {
            if (exercise.completed) {
              completedCount++;
              progressMap[`${entry.day}-${index}`] = true; // ✅ Store completion
            }
          });
        });

        // Ensure correct percentage calculation
        const progress =
          totalExercises > 0
            ? Math.round((completedCount / totalExercises) * 100)
            : 0;

        setUserProgress(progressMap); // ✅ Store user progress
        setProgressPercentage(progress); // ✅ Update percentage
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchWorkoutPlan();
    fetchProgress();
  }, [selectedUserId]);

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Users Workout plan
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-md mb-6">
        Admin can view selected user's workout plan.
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
        <div className="text-center text-red-600 font-semibold">
 
        </div>
      ) : workoutPlan && workoutPlan.weeklyWorkoutPlan ? (
        <>
          <div className="text-center mt-4 text-lg font-bold">
            Overall Progress: {progressPercentage}% Completed
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8 md:flex md:flex-wrap md:justify-center">
            {Object.keys(workoutPlan.weeklyWorkoutPlan).map((day) => (
              <button
                key={day}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all shadow-md w-full md:w-auto ${
                  activeDay === day
                    ? "bg-red-800 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveDay(day)}
              >
                {day.slice(0, 9)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center mx-auto max-w-5xl mt-6">
            {activeDay &&
              workoutPlan.weeklyWorkoutPlan[activeDay]?.map(
                (exercise, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-md mx-auto w-full max-w-[600px]"
                  >
                    <div className="relative">
                      {exercise.videoLink &&
                      getYouTubeThumbnail(exercise.videoLink) ? (
                        <>
                          <img
                            src={getYouTubeThumbnail(exercise.videoLink)}
                            alt="Exercise Thumbnail"
                            className="w-full h-64 object-cover rounded-lg cursor-pointer"
                            onClick={() => setVideoUrl(exercise.videoLink)}
                          />
                          <FaPlayCircle
                            className="absolute top-1/2 left-1/2 text-white text-5xl transform -translate-x-1/2 -translate-y-1/2 opacity-80 cursor-pointer"
                            onClick={() => setVideoUrl(exercise.videoLink)}
                          />
                        </>
                      ) : (
                        <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-bold mt-4">
                      {exercise.exercise}
                    </h4>
                    <p className="text-md text-gray-600 mt-1">
                      {exercise.muscleGroup}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 mb-4">
                      {exercise.description}
                    </p>
                    <span className="bg-blue-500 text-white text-sm px-5 py-2 rounded-lg">
                      {exercise.setsReps}
                    </span>

                    {/* Progress Indicator */}
                    <div className="mt-3 flex items-center">
                      {userProgress[`${activeDay}-${index}`] ? (
                        <FaCheckCircle className="text-green-500 text-2xl mr-2" />
                      ) : (
                        <FaTimesCircle className="text-red-500 text-2xl mr-2" />
                      )}

                      <span className="text-sm font-semibold">
                        {userProgress[`${activeDay}-${index}`]
                          ? "Completed"
                          : "Not Completed"}
                      </span>
                    </div>
                  </div>
                )
              )}
          </div>
        </>
      ) : (
        <p className="text-center text-red-500 font-semibold">
          No workout plan available.
        </p>
      )}

      {videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-700 text-2xl"
              onClick={() => setVideoUrl(null)}
            >
              ✖
            </button>
            <iframe
              className="w-full h-[400px] rounded-lg"
              src={videoUrl.replace("watch?v=", "embed/")}
              title="Workout Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workout;
