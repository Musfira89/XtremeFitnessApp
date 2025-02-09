import React from 'react';
import { motion } from 'framer-motion'; // Importing Framer Motion
import serviceImage1 from '../../assets/LandingPageImg/service1.png'; // Import images
import serviceImage2 from '../../assets/LandingPageImg/service2.png';
import serviceImage3 from '../../assets/LandingPageImg/service3.png';

const Services = () => {
  return (
    <motion.section
      id="services"
      className="bg-red-50 py-16 md:py-24"
      initial={{ opacity: 0 }} // Start with opacity 0
      whileInView={{ opacity: 1 }} // Fade in when in view
      transition={{ duration: 1 }} // Animation duration
      viewport={{ once: true }} // Trigger the animation once when entering the viewport
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-black"
          initial={{ y: -50, opacity: 0 }} // Start from above with no opacity
          whileInView={{ y: 0, opacity: 1 }} // Animate to original position with full opacity
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} // Trigger animation when in view
        >
          Our Services
        </motion.h2>
        <div className="mt-3 h-1 w-24 md:w-32 bg-red-700 mx-auto"></div>
      </div>

      {/* Service Cards */}
      <div className="container mx-auto flex flex-wrap justify-center gap-8 px-4">
        {/* Card 1 */}
        <motion.div
          className="w-full sm:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: -100 }} // Start from the left with no opacity
          whileInView={{ opacity: 1, x: 0 }} // Animate to the center with full opacity
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={serviceImage1} // Use imported image
            alt="Service 1"
            className="w-full h-64 object-cover"
          />
          <div className="bg-red-700 text-white text-center py-6">
            <span className="text-lg md:text-xl font-bold">Automated Workout Plans</span>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="w-full sm:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: 100 }} // Start from the right with no opacity
          whileInView={{ opacity: 1, x: 0 }} // Animate to the center with full opacity
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={serviceImage2} // Use imported image
            alt="Service 2"
            className="w-full h-64 object-cover"
          />
          <div className="bg-red-700 text-white text-center py-6">
            <span className="text-lg md:text-xl font-bold">Automated Meal Plans</span>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="w-full sm:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 100 }} // Start from below with no opacity
          whileInView={{ opacity: 1, y: 0 }} // Animate to the center with full opacity
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={serviceImage3} // Use imported image
            alt="Service 3"
            className="w-full h-64 object-cover"
          />
          <div className="bg-red-700 text-white text-center py-6">
            <span className="text-lg md:text-xl font-bold">Supplement Recommendation</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
