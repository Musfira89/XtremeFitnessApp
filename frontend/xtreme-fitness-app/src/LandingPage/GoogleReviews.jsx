import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Rating, Avatar } from "@mui/material";
import GoogleIcon from "../assets/LandingPageImg/google.png";
const reviews = [
  {
    name: "Dominic Koorn",
    date: "a year ago",
    rating: 5,
    comment:
      "I have been working with Xavier for 6 weeks now. I started my journey at 198 lbs with a goal weight of 165 lbs. I have lost 15 lbs in these past 6 weeks. The meals and workouts are easy to follow and leave me feeling energized. X has motivated and inspired me to set goals beyond just weight loss. His positive attitude to any situation is refreshing and helps keep me on track. I would and do recommend his coaching and services to others. I am half way through the program and as X would say to me let's get it!!!",
  },
  {
    name: "John Lloyd",
    date: "a year ago",
    rating: 5,
    comment:
      "At 61, 40 to 50 lbs overweight at 223 lbs, and staring into my third 30 of life. I knew that I had to make some changes - and commit to it! I wanted a structured program that included workout routines and a nutrition component to complement the workouts. I've tried both, separately, with limited success. I connected with Xavier Beckford. Working with Xavier is a commitment - time, money, and effort, to the workouts and the meal plans. I made that commitment in the program, Xavier made a commitment to me. I've worked the process for 3 months - working out 5 days a week, and shopping and cooking to the meal plan. I've pretty much kept to schedule. It's not been easy - I expected a challenge, but Xavier has been an outstanding coach and mentor throughout, and keeping me on track.",
  },
  {
    name: "paige harward",
    date: "a year ago",
    rating: 5,
    comment:
      "I have been working with Xavier for over 5 months. He is a great coach; motivating and great with communication. I have been working out on my own for many years but never able to get the weight off, actually seemed to put more on. We sat down and determined it wasn't my working out that I needed to work on as much as my nutrition. We started a nutrition plan and a workout plan. This changes up each month. He encouraged me to keep pictures and measurements because I was so focused on the scale. When I have questions about food or an exercise he is extremely knowledgeable and so willing to help. He works outside of office hours and is always prompt to answer when I have questions.In the 5 months we have worked together, I have lost over 50, that is 4.6 FEET of body, and 20 lbs. I am so glad I chose to work with Xavier and have never once had any regrets.",
  },
];

const GoogleReviews = () => {
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-16 mt-24">
      {/* Main Heading */}
      <div className="text-center mb-10 px-4 sm:mb-20">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
          Our Google Reviews
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-2 sm:mt-3 max-w-md sm:max-w-2xl mx-auto">
          See what our customers say about their experience with us!
        </p>
        <div className="mt-2 sm:mt-3 h-1 w-16 sm:w-24 bg-red-800 mx-auto"></div>
      </div>

      {/* Reviews Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-700 flex flex-col transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            {/* Profile and Name Section */}
            <div className="flex items-center gap-4">
              <Avatar
                src={GoogleIcon}
                sx={{ width: 50, height: 50 }}
                alt="Google Icon"
              />
              <div>
                <p className="text-gray-900 font-semibold text-lg">
                  {review.name}
                </p>
                <p className="text-gray-500 text-sm">{review.date}</p>
              </div>
            </div>

            {/* Ratings */}
            <div className="mt-3">
              <Rating
                value={review.rating}
                precision={0.5}
                readOnly
                sx={{
                  color: "#FFD700", // Yellow Stars
                }}
              />
            </div>

            {/* Review Comment */}
            <p className="text-gray-700 mt-3 italic leading-relaxed">
              {expanded[index]
                ? `"${review.comment}"`
                : `"${review.comment.slice(0, 150)}..."`}
            </p>

            {/* Read More Button */}
            {review.comment.length > 150 && (
              <button
                className="text-red-800 font-semibold mt-2 underline hover:text-red-900 transition"
                onClick={() => toggleReadMore(index)}
              >
                {expanded[index] ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* More Reviews Button */}
      <div className="mt-12">
        <a
          href="https://www.google.com/maps/place/Xtreme+Fitness+Training+LLC/@24.9170097,67.016666,12z/data=!4m8!3m7!1s0x89c261820d3a36cd:0x8775fd6725ff3f0a!8m2!3d40.698979!4d-73.782586!9m1!1b1!16s%2Fg%2F11h79njg10?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-red-700 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-red-900 transition"
        >
          See More Reviews
        </a>
      </div>
    </div>
  );
};

export default GoogleReviews;
