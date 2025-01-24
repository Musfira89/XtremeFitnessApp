import React, { useContext, useState } from "react";
import BgImg from "../../assets/Background.jpg";
import logo from "../../../public/XtremeLogo.png";

const HeroSection = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center p-14 m-5 rounded-lg"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
{/* Overlay */}

<header className="absolute top-0 left-0 w-full">
  <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between py-6">
    {/* Navbar - Left */}
    <div className="flex items-center space-x-4 flex-1">
      <img src={logo} alt="Logo" className="h-16" /> {/* Increased logo size */}
    </div>

    {/* Right */}
    <div className="flex items-center justify-center space-x-3 flex-1 relative">
      <nav className="flex items-center space-x-8">
        <a
          href="#"
          className="text-gray-900 text-lg font-bold hover:text-gray-300" 
        >
          Home
        </a>
        <a
          href="#"
          className="text-gray-900 text-lg font-bold hover:text-gray-300" 
        >
          Features
        </a>
        <a
          href="#"
          className="text-gray-900 text-lg font-bold hover:text-gray-300" 
        >
          Prizing
        </a>
        <a
          href="#"
          className="text-gray-900 text-lg font-bold hover:text-gray-300" 
        >
          Contact
        </a>
      </nav>
      <button 
        className="border-2 border-black text-black font-bold px-4 py-2 rounded-md" 
      >
        Account
      </button> 
    </div>
  </div>

  {/* Space Below Navbar */}
</header>

      {/* Hero Content */}
      <div className="container mx-auto relative z-10 px-6 lg:px-2 flex items-center h-full">
        <div className="text-left max-w-lg pt-32">
          <h1 className="text-black text-5xl md:text-[55px] font-bold mb-6 leading-tight">
            Automate Your Fitness Journey
          </h1>
          <p className="text-black text-lg md:text-md mb-6">
            Unlock your potential with customized workout and meal plans
            designed just for you. Start your fitness transformation today!
          </p>
          <button className="bg-red-800 text-white font-semibold py-3 px-12 rounded-md hover:bg-gray-800 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
