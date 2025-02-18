import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SupplementRecommendations = () => {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/generate-supplement/${userId}`
        );
        setSupplements(response.data.supplements);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supplements:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchSupplements();
    }
  }, [userId]);

  return (
    <div className="p-6 md:p-10 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg">
      {/* Section Header */}
      <header className="text-center mb-12 mt-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Supplement Recommendations
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
          Based on your fitness plan, we’ve curated supplements to boost your
          performance and recovery.
        </p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {supplements.map((supplement) => (
          <div
            key={supplement._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Image Section */}
            <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <img
                src={supplement.image}
                alt={supplement.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-red-600">
                {supplement.name}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2">
                {supplement.description}
              </p>

              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                <strong>Category:</strong> {supplement.category}
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                <strong>Recommended For:</strong> {supplement.recommendedFor}
              </p>

              <p className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">
                {supplement.price}
              </p>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SupplementRecommendations;
