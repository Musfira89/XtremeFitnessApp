import React from "react";
import { motion } from "framer-motion";
import { successStories } from "./data";
import bgImage from "../../assets/LandingPageImg/cardsBg.jpg"; // Background image for hero section
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
const Journey = () => {
  return (
    <>
      <Navbar />
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mt-6"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Heading Section */}
        <div className="text-center mb-32 mt-8">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Success Stories
          </motion.h2>
          <motion.p
            className="text-gray-600 text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            See what our students have to say
          </motion.p>
        </div>

        {/* Stories Section */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              className="flex flex-col lg:flex-row items-center gap-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Left Child: Images */}
              <div className="w-full lg:w-1/2 flex gap-4 items-center justify-center">
                {/* Before Image */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={story.beforeImage}
                    alt="Before"
                    className="rounded-lg shadow-md w-[180px] sm:w-[200px] md:w-[220px] h-[260px] sm:h-[280px] md:h-[300px] object-cover"
                  />
                  <p className="text-center text-base sm:text-lg font-bold mt-2">Before</p>
                </motion.div>
                {/* After Image */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={story.afterImage}
                    alt="After"
                    className="rounded-lg shadow-md w-[180px] sm:w-[200px] md:w-[220px] h-[260px] sm:h-[280px] md:h-[300px] object-cover"
                  />
                  <p className="text-center text-base sm:text-lg font-bold mt-2">After</p>
                </motion.div>
              </div>

              {/* Right Child: Content */}
              <motion.div
                className="w-full lg:w-1/2 bg-white shadow-lg rounded-md p-6 sm:p-8"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">{story.name}</h3>
                <div className="flex items-center mb-4">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <span key={i} className="text-red-500 text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {story.content}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Journey;
