import React, { useState, useEffect } from "react";
import bgImage from "../../assets/LandingPageImg/cardsBg.jpg"; // Background image
import clientImage1 from "../../assets/heroImg.png"; // Client image 1
import clientImage2 from "../../assets/heroImg.png"; // Client image 2
import clientImage3 from "../../assets/heroImg.png"; // Client image 3

const reviewsData = [
  {
    image: clientImage1,
    message: "This is the best service I have ever used! Highly recommend it to everyone.",
    name: "John Doe",
  },
  {
    image: clientImage2,
    message: "Fantastic experience. The team was so helpful, and everything was just perfect!",
    name: "Jane Smith",
  },
  {
    image: clientImage3,
    message: "I am really happy with the results. Great customer service and support.",
    name: "Alice Johnson",
  },
];

const ReviewSection = () => {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prevReview) => (prevReview + 1) % reviewsData.length);
    }, 4000); // Change review every 4 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div
      className="relative w-full h-[80vh] bg-cover bg-center flex flex-col items-center justify-center p-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Section Title */}
      <h2 className="text-5xl font-extrabold text-red-700 mb-12 text-center">
        Reviews from Clients
      </h2>

      {/* Review Card */}
      <div
        className="flex items-center bg-gradient-to-r from-red-700/60 to-red-500/60 text-white p-8 rounded-2xl shadow-lg max-w-4xl w-full transform transition-opacity duration-500"
        key={currentReview} // Key ensures smooth animation for each review
      >
        {/* Client Image */}
        <img
          src={reviewsData[currentReview].image}
          alt="Client"
          className="w-28 h-28 object-cover rounded-full border-4 border-white"
        />

        {/* Review Content */}
        <div className="flex flex-col ml-8">
          <p className="text-lg italic text-gray-100 mb-4 leading-relaxed">{`"${reviewsData[currentReview].message}"`}</p>
          <p className="text-xl font-bold text-white">{reviewsData[currentReview].name}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
