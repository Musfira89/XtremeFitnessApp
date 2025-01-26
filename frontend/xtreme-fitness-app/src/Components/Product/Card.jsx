import React from "react";
import bgImage from "../../assets/LandingPageImg/cardsBg.jpg"; // Background image
import proteinImage from "../../assets/products/protein.jpg"; // Product images
import testBoosterImage from "../../assets/products/test-booster.jpg";
import proteinBarsImage from "../../assets/products/protein-bars.jpg";
import fatBurnerImage from "../../assets/products/fat-burner.jpg";
import dumbbellsImage from "../../assets/products/dumbbells.jpg";
import workoutMatImage from "../../assets/products/workout-mat.jpg";
import workoutBenchImage from "../../assets/products/workout-bench.jpg";
import exerciseBikeImage from "../../assets/products/exercise-bike.jpg";

const products = [
  { name: "Protein", image: proteinImage, price: "$39.99" },
  { name: "Test Booster", image: testBoosterImage, price: "$29.99" },
  { name: "Protein Bars", image: proteinBarsImage, price: "$19.99" },
  { name: "Fat Burner", image: fatBurnerImage, price: "$24.99" },
  { name: "Dumbbells", image: dumbbellsImage, price: "$59.99" },
  { name: "Workout Mat", image: workoutMatImage, price: "$19.99" },
  { name: "Workout Bench", image: workoutBenchImage, price: "$149.99" },
  { name: "Exercise Bike", image: exerciseBikeImage, price: "$399.99" },
];

const ProductSection = () => {
  return (
    <div
      className="relative bg-cover bg-center py-24"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className="relative mb-24">
          <h2 className="text-4xl font-extrabold text-red-700">Fitness Supplements & Products</h2>
          <div className="mt-2 w-56 h-[3px] bg-red-600 mx-auto"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col items-center transition-all transform hover:scale-105 hover:shadow-xl"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              {/* Product Details */}
              <div className="p-6 text-center w-full">
                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                
                {/* Product Price */}
                <p className="text-xl font-bold text-red-600 mb-4">{product.price}</p>

                {/* Star Rating */}
                <div className="flex justify-center items-center mb-4">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <svg
                      key={starIndex}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={starIndex < Math.round(product.rating) ? "gold" : "none"}
                      stroke="gold"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M12 2.25l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.77l-6.18 3.25L7 14.38 2 9.5l6.91-1L12 2.25z" />
                    </svg>
                  ))}
                </div>

                {/* Buy Now Button */}
                <button className="bg-red-600 text-white px-8 py-2 rounded-md font-semibold hover:bg-red-700 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
