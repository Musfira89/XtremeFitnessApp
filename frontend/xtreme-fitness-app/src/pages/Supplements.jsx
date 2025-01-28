import React from "react";

const supplementsData = [
  {
    name: "Whey Protein",
    image: "https://i5.walmartimages.com/asr/663d9840-58da-4716-8a7d-d93f20daf6ea_1.58eb687b09f1b55c238d9e6ab3f4fc7a.jpeg", // Replace with a real image URL
    description: "High-quality protein to support muscle recovery and growth.",
    price: "$29.99",
  },
  {
    name: "BCAAs",
    image: "https://images-na.ssl-images-amazon.com/images/I/8156OxGvAJL._SL1500_.jpg", // Replace with a real image URL
    description: "Branched-Chain Amino Acids for improved endurance and recovery.",
    price: "$19.99",
  },
  {
    name: "Multivitamins",
    image: "https://i5.walmartimages.com/asr/20099b12-ac80-402f-8c27-36f5213c2387_2.59ccdb2a957b01496c387a99ec5ba149.jpeg", // Replace with a real image URL
    description: "Daily vitamins and minerals to support overall health.",
    price: "$14.99",
  },
  {
    name: "Creatine",
    image: "https://cdn.muscleandstrength.com/store/media/catalog/product/cache/all/image/700x700/602f0fa2c1f0d1ba5e241f914e856ff9/n/u/nutrex-creatine-monohydrate-300g_5.jpg", // Replace with a real image URL
    description: "Boost strength and performance during workouts.",
    price: "$24.99",
  },
];

const SupplementRecommendations = () => {
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg">
      {/* Section Header */}
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Supplement Recommendations
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 text-center">
        Based on your fitness plan, we’ve curated supplements to boost your
        performance and recovery.
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {supplementsData.map((supplement, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden relative border border-gray-200 dark:border-gray-700"
          >
            {/* Card Border Gradient */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500 to-red-700 opacity-10 pointer-events-none"></div>

            {/* Image Section */}
            <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <img
                src={supplement.image}
                alt={supplement.name}
                className="w-auto h-full object-contain"
              />
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-red-600">
                {supplement.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                {supplement.description}
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">
                {supplement.price}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col space-y-2">
               
                <button className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
                Buy on Amazon
                </button>
             
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplementRecommendations;
