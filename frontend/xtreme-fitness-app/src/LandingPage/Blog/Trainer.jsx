import React from "react";
import img1 from "../../assets/Xavier1.jpg";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import Journey from "./Transformation";
import Mission from "./Mission"
import { motion } from "framer-motion";
import { HashLink as Link } from "react-router-hash-link"; // Import for smooth scrolling

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section className="container mx-auto px-2 py-16 mb-40 mt-6">
        {/* Heading Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-28"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            About Us
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Have a look at what we have to offer
          </p>
        </motion.div>

        {/* Parent Container */}
        <div className="flex flex-col md:flex-row items-center bg-white overflow-hidden gap-2">
          {/* Left Child Container (Image) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-[75%] mx-auto md:ml-2">
              <img
                src={img1}
                alt="Xavier Beckford"
                className="w-full rounded-full"
              />
              <div className="absolute -top-2 -left-2 w-full h-full bg-red-500 opacity-20 rounded-full -z-10"></div>
            </div>
          </motion.div>

          {/* Right Child Container (Content) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className="w-full md:w-1/2 p-4 bg-white"
          >
            <p className="text-red-500 font-semibold text-lg">Trainer Bio</p>
            <h3 className="text-4xl font-extrabold text-gray-900 mt-2 leading-snug">
              Hey, I Am Xavier Beckford
            </h3>
            <p className="text-gray-700 mt-3 leading-relaxed">
              Xavier Beckford is the Master Trainer and owner of Xtreme Fitness
              Training. He has been working in the fitness industry since 2005.
              His dedication and passion for fitness made him the person he is
              today. He took his knowledge of fitness and nutrition above and
              beyond by acquiring a BS in Nutrition and Exercise Science from
              the University of Queens College.
            </p>
            <p className="text-gray-700 mt-2 leading-relaxed">
              He has worked with individuals as young as 12 and as old as 75
              years, helping them achieve their fitness goals, whether it’s
              losing weight, gaining muscle, or improving general health.
            </p>

            {/* Contact Button */}
{/* Contact Now Button with Link */}
<motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-8 py-3 bg-red-800 text-white font-semibold rounded-md"
          >
            <Link smooth to="/#contact-us" className="hover:text-red-300">
              CONTACT US
            </Link>
          </motion.button>
          </motion.div>
        </div>
      </section>
      <Journey/>
      <Mission/>
      <Footer />
    </>
  );
};

export default AboutUs;
