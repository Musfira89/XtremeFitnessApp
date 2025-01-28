import React from "react";
import { Star, Google } from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "John Doe",
      rating: 5,
      daysAgo: "2 days ago",
      review: "Amazing service and top-notch quality. Highly recommended!",
    },
    {
      name: "Jane Smith",
      rating: 4,
      daysAgo: "5 days ago",
      review: "Great experience overall! Will definitely come back.",
    },
    {
      name: "Michael Brown",
      rating: 5,
      daysAgo: "1 week ago",
      review: "The team was very professional and helpful throughout the process.",
    },
    {
      name: "Sarah Johnson",
      rating: 5,
      daysAgo: "2 weeks ago",
      review: "Fantastic experience from start to finish!",
    },
    {
      name: "Chris Lee",
      rating: 4,
      daysAgo: "3 days ago",
      review: "Very good service, I would recommend it.",
    },
    {
      name: "Emily Davis",
      rating: 5,
      daysAgo: "1 month ago",
      review: "A truly excellent experience! Highly satisfied!",
    },
  ];

  // Slider settings
  const settings = {
    dots: true, // Enable dot navigation
    infinite: true, // Infinite loop
    speed: 500, // Slide transition speed
    slidesToShow: 3, // Show 3 cards at a time
    slidesToScroll: 1, // Scroll one card at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Slide after 3 seconds (adjust speed here)
    arrows: false, // Remove left and right arrows
    centerMode: true, // Enable center mode for better spacing
    centerPadding: "50px", // Increase padding to add space between cards
    focusOnSelect: true, // Focus on select to make sure center mode works
  };
  

  return (
    <div className="bg-red-100 flex flex-col items-center py-32 px-6">
      {/* Section Heading */}
      <h1 className="text-5xl font-bold text-black mb-12 text-center">
        Google Reviews
      </h1>

      {/* Reviews Slider */}
      <div className="w-full max-w-6xl">
        <Slider {...settings}>
          {reviews.map((review, index) => (
           <div
           key={index}
           className="bg-white p-12 rounded-lg shadow-lg flex flex-col items-start space-y-6 mx-6" // Changed mx-4 to mx-6 for more spacing
         >
         
              {/* Name and Icon */}
              <div className="flex items-center space-x-2">
                <Google className="text-red-600" />
                <h2 className="text-2xl font-semibold text-gray-800"> {/* Increased text size */}
                  {review.name}
                </h2>
              </div>

              {/* Rating and Time */}
              <div className="flex items-center justify-between w-full text-gray-500">
                {/* Stars */}
                <div className="flex space-x-1">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} className="text-yellow-500" />
                  ))}
                </div>
                {/* Time */}
                <p>{review.daysAgo}</p>
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-lg">{review.review}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewsSection;
