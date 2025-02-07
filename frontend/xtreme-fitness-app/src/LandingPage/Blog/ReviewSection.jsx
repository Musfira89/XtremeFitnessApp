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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Default for large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: true,
    centerPadding: "50px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
          centerPadding: "20px", // Adjust padding for medium screens
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 1,
          centerPadding: "10px", // Adjust padding for smaller screens
        },
      },
    ],
  };
  

  return (
    <div id="reviews" className="bg-red-100 flex flex-col items-center py-32 px-6">
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
              className="bg-white p-12 rounded-lg shadow-lg flex flex-col items-start space-y-6 mx-6"
            >
              {/* Name and Icon */}
              <div className="flex items-center space-x-2">
                <Google className="text-red-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
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
