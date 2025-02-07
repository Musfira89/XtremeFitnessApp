import React from "react";
import products from "./productData"; // Products array with affiliate links
import bgImage from "../../assets/LandingPageImg/service3.png"; // Background image for hero section

const BuyCards = () => {
  return (
    <div className="bg-gray-50 bg-gradient-to-r from-gray-50 to-red-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[300px] sm:h-[400px] flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-red-700 bg-opacity-50 p-6 sm:p-12 rounded-lg">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wide">
            All Fitness Products at one place
          </h1>
        </div>
      </div>

      {/* Affiliate Disclosure */}
      <div className="max-w-4xl mx-auto mt-8 sm:mt-12 mb-6 px-4 sm:px-6 text-center">
        <p className="text-sm sm:text-base text-gray-700 font-medium bg-yellow-100 p-4 rounded-md border border-yellow-300">
          Disclaimer: This page contains affiliate links. If you purchase
          through these links, we may earn a small commission at no additional
          cost to you.
        </p>
      </div>

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center mt-12 sm:mt-20">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-red-700 mb-8 sm:mb-16">
          Explore All Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center transition-all transform hover:scale-105 hover:shadow-2xl"
              style={{ width: "100%", maxWidth: "340px", height: "auto", paddingBottom: "16px" }}
            >
              {/* Affiliate Tag */}
              <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-md">
                Affiliate
              </div>

              {/* Product Image */}
              <div className="relative h-48 sm:h-72 w-full overflow-hidden rounded-md flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 sm:p-6 text-center w-full flex flex-col items-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-lg sm:text-xl font-bold text-red-600 mb-4">
                  {product.price}
                </p>
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-6 sm:px-8 py-2 rounded-md font-semibold hover:bg-red-700 transition duration-300 inline-block"
                >
                  Buy on Amazon
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyCards;
