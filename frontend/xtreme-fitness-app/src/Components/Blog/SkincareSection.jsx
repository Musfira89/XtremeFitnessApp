import React from 'react';
import skincareImg from '../../assets/fitness.jpg';

const SkincareSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-black p-10 md:p-16 rounded-lg shadow-xl gap-28">
      {/* Left Image Section */}
      <div className="flex-1 max-w-md md:max-w-lg">
        <img
          src={skincareImg}
          alt="Skincare Product"
          className="rounded-lg shadow-lg transform "
        />
      </div>

      {/* Right Content Section */}
      <div className="flex-1 text-center md:text-left max-w-xl"> {/* Increased max-w-lg to max-w-xl */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-100 leading-tight mb-6">
          Transform Your Fitness Journey
        </h2>
        <p className="text-gray-100 text-lg md:text-xl leading-relaxed mb-8">
          Unlock your full potential with personalized fitness plans, expert guidance, 
          and innovative tools designed to help you achieve your health and fitness goals.
        </p>
        <button className="bg-white text-black font-semibold py-3 px-12 rounded-md hover:bg-gray-200 transition duration-300">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default SkincareSection;
