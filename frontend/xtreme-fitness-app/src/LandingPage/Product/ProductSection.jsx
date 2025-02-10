import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importing Framer Motion
import bgImage from "../../assets/LandingPageImg/cardsBg.jpg"; // Background image
import products from "./productData";

const ProductSection = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      id="products"
      className="relative bg-cover bg-center py-16 sm:py-20 mt-8 sm:mt-12"
      style={{ backgroundImage: `url(${bgImage})` }}
      initial={{ opacity: 0 }} // Start with no opacity
      whileInView={{ opacity: 1 }} // Fade in when in view
      transition={{ duration: 1 }} // Animation duration
      viewport={{ once: true }} // Trigger animation once when entering the viewport
    >
      {/* Section Heading */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-14"
        initial={{ y: -50, opacity: 0 }} // Start from above with no opacity
        whileInView={{ y: 0, opacity: 1 }} // Animate to original position with full opacity when in view
        transition={{ duration: 0.8 }} // Animation duration
        viewport={{ once: true }} // Trigger animation when in view
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Our Fitness Picks
        </h2>
        <p className="text-gray-600 mt-3 text-base sm:text-lg">
          High-quality supplements and equipment for your fitness goals.
        </p>
        <div className="w-16 sm:w-20 h-[3px] bg-red-600 mx-auto mt-2"></div>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 sm:mt-12 px-4 sm:px-6 lg:px-0"
        initial={{ opacity: 0 }} // Start with no opacity
        whileInView={{ opacity: 1 }} // Fade in when in view
        transition={{ duration: 1 }} // Animation duration
        viewport={{ once: true }} // Trigger animation once when entering the viewport
      >
        {products.slice(0, 3).map((product, index) => (
          <motion.div
            key={index}
            className="group relative bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between items-center transition-transform transform hover:scale-105"
            style={{ width: "100%", maxWidth: "340px", height: "460px" }}
            initial={{ opacity: 0, y: 50 }} // Start from below with no opacity
            whileInView={{ opacity: 1, y: 0 }} // Animate to original position with full opacity when in view
            transition={{ duration: 0.8 }}
            viewport={{ once: true }} // Trigger animation when in view
          >
           

            {/* Product Image */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-md flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Product Details */}
            <div className="mt-4 flex flex-col items-center text-center">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <button
                className="mt-4 mb-4 px-4 sm:px-6 py-2 bg-red-600 text-white rounded-md font-medium shadow-sm hover:bg-red-700 hover:shadow-md transition"
                onClick={() => window.open(product.affiliateLink, "_blank")}
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* See More Button */}
      <div className="mt-10 sm:mt-12 text-center">
        <button
          onClick={() => navigate("/buycards")}
          className="px-8 sm:px-10 py-2 sm:py-3 border-2 border-red-600 text-red-600 text-sm sm:text-lg font-semibold rounded-md hover:bg-red-600 hover:text-white transition"
        >
          See More Products
        </button>
      </div>
    </motion.div>
  );
};

export default ProductSection;
