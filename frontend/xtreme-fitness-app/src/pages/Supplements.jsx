import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";

const SupplementRecommendations = () => {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/generate-supplement/${userId}`
        );
        setSupplements(response.data.supplements);
      } catch (error) {
        console.error("Error fetching supplements:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSupplements();
    }
  }, [userId]);

  return (
    <div className="p-6 md:p-10 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg">
      <header className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Supplement Recommendations
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
          Based on your fitness plan, we’ve curated supplements to boost your performance and recovery.
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <table className="min-w-full border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Recommended For</th>
              </tr>
            </thead>
            <tbody>
              {supplements.map((supplement) => (
                <tr key={supplement._id} className="border text-center text-gray-700 dark:text-gray-300">
                  <td className="px-4 py-3 border font-medium">{supplement.name}</td>
                  <td className="px-4 py-3 border text-sm">{supplement.description}</td>
                  <td className="px-4 py-3 border">{supplement.category}</td>
                  <td className="px-4 py-3 border">{supplement.recommendedFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Consultation Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm">
            <Dialog.Title className="text-lg font-semibold text-red-600 dark:text-red-400 text-center">
              Important Notice
            </Dialog.Title>
            <Dialog.Description className="text-gray-700 dark:text-gray-300 mt-2 text-center">
              Consult with your coach before using any supplement.
            </Dialog.Description>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Got it
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SupplementRecommendations;
