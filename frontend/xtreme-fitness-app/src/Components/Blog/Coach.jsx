import React, { useState } from "react";
import bgImage from "../../assets/LandingPageImg/cardsBg.jpg";
import coachImage from "../../assets/flexible.jpg"; // Replace with the actual path to the coach's image

const CoachBio = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-4/5 lg:w-3/4 bg-gradient-to-r from-red-700 via-red-800 to-red-400 backdrop-blur-md rounded-2xl p-16 shadow-2xl gap-10">
        {/* Left Section */}
        <div className="md:w-2/3 text-center md:text-left">
          <h1 className="text-6xl font-extrabold text-white mb-8">Xavier Beckford Bio</h1>
          <p className="text-white text-lg leading-relaxed">
            Xtreme Fitness Training is committed to helping our clients achieve their fitness goals.
            Through customized nutrition plans and training programs, we not only teach lifestyle
            change, but we also help develop the habits needed to ensure our clients maintain their
            results. Our clients bring their commitment, determination, and drive; we bring the
            tools and support they need to succeed.
          </p>
          {isExpanded && (
            <p className="text-white text-lg leading-relaxed mt-6">
              Xtreme Fitness Training believes in getting fit and staying fit by focusing on the
              health issue prevention rather than the cures. We provide 100% accountability and
              support to keep you focused and on track which will allow you to reach your fitness
              goals and maintain them. All the uncertainties and guesswork will be eliminated
              through the specific diet and training program prescription that is tailored to each
              client.
            </p>
          )}
          <button
            onClick={toggleReadMore}
            className="mt-6 px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-red-700 transition"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 flex justify-center">
          <div className="rounded-xl shadow-lg overflow-hidden">
            <img
              src={coachImage}
              alt="Coach Xavier Beckford"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachBio;
