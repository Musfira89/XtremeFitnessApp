import React, { useEffect, useState } from "react";
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
  const [videoUrl, setVideoUrl] = useState(null); // For modal video

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/generate-workout-plan/${userId}`
        );
        setWorkoutPlan(response.data?.workoutPlan || {});
      } catch (error) {
        console.error("Error fetching workout plan:", error);
        setWorkoutPlan({});
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, [userId]);

  const toggleCompletion = (day, index) => {
    setCompletedExercises((prev) => {
      const updatedExercises = {
        ...prev,
        [`${day}-${index}`]: !prev[`${day}-${index}`],
      };
      const completedCount =
        Object.values(updatedExercises).filter(Boolean).length;
      const totalExercises = Object.entries(
        workoutPlan.weeklyWorkoutPlan
      ).reduce((acc, [, exercises]) => acc + exercises.length, 0);
      setProgress(Math.round((completedCount / totalExercises) * 100));
      return updatedExercises;
    });
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

  if (!workoutPlan || !workoutPlan.weeklyWorkoutPlan) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-red-600">
          No Workout Plan Found
        </h2>
      </div>
    );
  }

  return (
    <section className="p-8 bg-gray-50 rounded-xl shadow-xl max-w-9xl mx-auto">
      <header className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Weekly Workout Plan
        </h2>
        <p className="text-lg text-gray-700 mt-2">
          Your customized plan for the week
        </p>
        <div className="relative mt-6 w-full max-w-md mx-auto bg-gray-300 rounded-full h-4">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="mt-2 block text-gray-900 font-semibold">
          {progress}% Completed
        </span>
      </header>

      <div className="space-y-8">
        {Object.entries(workoutPlan.weeklyWorkoutPlan).map(
          ([day, exercises]) => (
            <div key={day} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{day}</h3>

              <div className="grid grid-cols-2 gap-6">
                {exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col"
                  >
                    <div className="relative">
                      {exercise.videoLink &&
                      getYouTubeThumbnail(exercise.videoLink) ? (
                        <>
                          <img
                            src={getYouTubeThumbnail(exercise.videoLink)}
                            alt="Tutorial Thumbnail"
                            className="w-full h-48 object-cover rounded-lg"
                            onClick={() => setVideoUrl(exercise.videoLink)}
                          />
                          <FaPlayCircle
                            className="absolute top-1/2 left-1/2 text-white text-5xl transform -translate-x-1/2 -translate-y-1/2 opacity-80 cursor-pointer"
                            onClick={() => setVideoUrl(exercise.videoLink)}
                          />
                        </>
                      ) : (
                        <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-lg text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <h4 className="text-lg font-bold text-gray-900">
                        {exercise.exercise}
                      </h4>

                      {exercise.muscleGroup && (
                        <p className="text-md text-gray-600 mt-4">
                          <strong>Target Muscle:</strong> {exercise.muscleGroup}
                        </p>
                      )}

                      {exercise.description && (
                        <p className="text-sm text-gray-600 mt-1 mb-6">
                          <strong>Description:</strong> {exercise.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-red-700 text-white text-sm px-5 py-3 rounded-lg">
                          {exercise.setsReps}
                        </span>
                        <AiOutlineCheckCircle
                          className={`text-2xl ${
                            completedExercises[`${day}-${index}`]
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                          onClick={() => toggleCompletion(day, index)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* Modal for Video */}
      {videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 relative w-full max-w-3xl">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setVideoUrl(null)}
            >
              ×
            </button>
            <iframe
              width="100%"
              height="400"
              src={videoUrl.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkoutPlan;
