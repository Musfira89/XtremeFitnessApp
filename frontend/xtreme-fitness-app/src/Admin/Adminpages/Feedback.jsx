import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const UserFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/feedback/all");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const feedbackList = useMemo(() => feedbacks, [feedbacks]);

  return (
    <div className="w-full bg-gray-100 py-16 px-6">
      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900">
        User Feedback
      </h2>

      {/* Subheading */}
      <p className="text-sm sm:text-base md:text-lg text-center text-gray-600 mt-2 mb-10">
  See what our users have to say about their transformation journey.
</p>


      {/* No Feedback Message */}
      {feedbackList.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">
          No feedback available at the moment. Please check back later.
        </p>
      ) : (
        // Feedback Cards in Flexbox Layout (2 per row)
        <div className="flex flex-wrap justify-center gap-8 w-[90%] mx-auto">
          {feedbackList.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white shadow-lg border border-gray-300 rounded-xl p-6 flex flex-col items-center transition-all duration-300 hover:shadow-2xl w-[45%] min-w-[300px]"
            >
              {/* Profile Section */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold uppercase text-gray-900">
                  {feedback.fullName}
                </h3>
                <div className="flex justify-center mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`text-yellow-400 text-2xl ${
                        index < feedback.rating
                          ? "fill-current"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Before & After Images */}
              <div className="flex items-center justify-center gap-6 mt-5 mb-5">
                <div className="relative w-48 h-48">
                  <img
                    src={feedback.beforeImage}
                    alt="Before"
                    className="w-full h-full object-contain rounded-lg border border-gray-300 shadow-md"
                  />
                  <span className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md">
                    Before
                  </span>
                </div>
                <div className="relative w-48 h-48">
                  <img
                    src={feedback.afterImage}
                    alt="After"
                    className="w-full h-full object-contain rounded-lg border border-gray-300 shadow-md"
                  />
                  <span className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md">
                    After
                  </span>
                </div>
              </div>

              {/* Feedback Text */}
              <p className="text-gray-600 italic text-base leading-relaxed text-center px-6 mb-4">
                "{feedback.feedback}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFeedbackList;
