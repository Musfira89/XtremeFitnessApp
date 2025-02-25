import React, { useEffect, useState , useRef} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { CircularProgress } from "@mui/material";

const WorkoutPlan = () => {
  const { userId } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedExercises, setCompletedExercises] = useState({});
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [activeDay, setActiveDay] = useState(null);

  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;
  
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/generate-workout-plan/${userId}`
        );
        setWorkoutPlan(response.data?.workoutPlan || {});
        setActiveDay(Object.keys(response.data?.workoutPlan?.weeklyWorkoutPlan || {})[0]);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchWorkoutPlan();
  }, [userId]);
  
  

  const toggleCompletion = async (day, index) => {
    if (completedExercises[`${day}-${index}`]) return;
  
    setCompletedExercises((prev) => {
      const updatedExercises = { ...prev, [`${day}-${index}`]: true };
  
      // Ensure totalExercises is calculated correctly
      const totalExercises = Object.values(workoutPlan?.weeklyWorkoutPlan || {}).reduce(
        (acc, exercises) => acc + exercises.length,
        0
      );
  
      const completedCount = Object.values(updatedExercises).filter(Boolean).length;
      setProgress(
        totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0
      );
  
      return updatedExercises;
    });
  
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/update-progress`,
        { userId, day, exerciseIndex: index, completed: true }
      );
  
      // Show toast message **after successful API call**
      toast.success("Workout marked as complete!", {
        duration: 1500, // Short duration
        style: {
          background: "#000", // Black background
          color: "#fff", // White text
        },
      });
  
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };
  

  const getYouTubeThumbnail = (url) => {
    const videoId = url?.split("v=")[1]?.split("&")[0];
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <section className="p-4 md:p-6 bg-white min-h-screen text-black">
      <header className="text-center mb-6 mt-4">
        <h2 className="text-md sm:text-2xl md:text-4xl font-extrabold text-gray-900 text-center">
          Weekly Workout Plan
        </h2>

        {/* Progress Bar */}
        <div className="w-full max-w-lg mx-auto mt-4 bg-gray-300 rounded-full h-2 sm:h-4 relative">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-xs sm:text-lg text-center">
          {progress}% Completed
        </p>

        {/* Days Selection Buttons */}
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
      </header>
      <div className="flex flex-col gap-6 mt-20">
        <div className="w-full bg-white p-6 text-gray-900">
          {/* Centered Cards with Proper Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center mx-auto max-w-5xl">
            {workoutPlan.weeklyWorkoutPlan[activeDay]?.map(
              (exercise, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-md mx-auto w-full max-w-[700px] sm:max-w-[90%] md:max-w-[600px]"
                >
                  <div className="relative">
                    {exercise.videoLink &&
                    getYouTubeThumbnail(exercise.videoLink) ? (
                      <>
                        <img
                          src={getYouTubeThumbnail(exercise.videoLink)}
                          alt="Exercise Thumbnail"
                          className="w-full h-64 sm:h-72 object-cover rounded-lg cursor-pointer"
                          onClick={() => setVideoUrl(exercise.videoLink)}
                        />
                        <FaPlayCircle
                          className="absolute top-1/2 left-1/2 text-white text-5xl transform -translate-x-1/2 -translate-y-1/2 opacity-80 cursor-pointer"
                          onClick={() => setVideoUrl(exercise.videoLink)}
                        />
                      </>
                    ) : (
                      <div className="w-full h-64 sm:h-72 bg-gray-300 flex items-center justify-center rounded-lg text-gray-500">
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
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-500 text-white text-sm px-5 py-2 rounded-lg">
                      {exercise.setsReps}
                    </span>
                    <AiOutlineCheckCircle
                      className={`text-3xl cursor-pointer ${
                        completedExercises[`${activeDay}-${index}`]
                          ? "text-green-500"
                          : "text-gray-400"
                      } ${
                        completedExercises[`${activeDay}-${index}`]
                          ? "pointer-events-none"
                          : ""
                      }`} // Disable click
                      onClick={() => toggleCompletion(activeDay, index)}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
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
    </section>
  );
};

export default WorkoutPlan;
