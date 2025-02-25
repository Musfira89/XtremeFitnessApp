import React, { useState, useEffect } from "react";
import axios from "axios";

const Supplements = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;

    const fetchSupplements = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/generate-supplement/${selectedUserId}`
        );
        setSupplements(response.data.supplements || []);
      } catch (error) {
        console.error("Error fetching supplements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplements();
  }, [selectedUserId]);

  const getCategoryColor = (category) => {
    const colors = {
      Vitamins: "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300",
      "Fatty Acids": "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300",
      Protein: "bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-300",
      Minerals: "bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300",
      Fiber: "bg-pink-100 text-pink-600 dark:bg-pink-800 dark:text-pink-300",
    };
    return colors[category] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Supplements
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-md mb-6">
        Admin can view selected user's supplements.
      </p>

      {/* User Selection */}
      <div className="w-full max-w-lg mb-6">
        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Select User
        </label>
        <select
          className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Choose a User</option>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName || user.name || "Unnamed User"}
              </option>
            ))
          ) : (
            <option disabled>Loading users...</option>
          )}
        </select>
      </div>

      {/* Supplements Table */}
      {loading ? (
        <div className="flex items-center justify-center space-x-3">
          <div className="w-6 h-6 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Fetching supplements...
          </p>
        </div>
      ) : supplements.length > 0 ? (
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden p-6">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-lg font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-lg font-semibold">Description</th>
                <th className="px-6 py-3 text-left text-lg font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-lg font-semibold">Recommended For</th>
              </tr>
            </thead>
            <tbody>
              {supplements.map((supplement, index) => (
                <tr
                  key={supplement._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200`}
                >
                  <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">
                    {supplement.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm">
                    {supplement.description}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                        supplement.category
                      )}`}
                    >
                      {supplement.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {supplement.recommendedFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-lg">No supplements found.</p>
      )}
    </div>
  );
};

export default Supplements;
