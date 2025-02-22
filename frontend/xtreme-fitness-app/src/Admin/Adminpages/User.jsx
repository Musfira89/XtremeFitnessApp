import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to open delete confirmation modal
  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  // Function to handle user deletion
  const handleDeleteUser = async () => {
    if (!selectedUserId) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/users/${selectedUserId}`
      );
      setUserData((prevUsers) =>
        prevUsers.filter((user) => user._id !== selectedUserId)
      );
      setShowModal(false);
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <section className="w-full h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg flex flex-col">
      <div className="flex-grow overflow-auto p-6">
        <table className="w-full table-auto text-gray-800 border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-red-700 to-red-900 text-white">
              <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                Account Creation
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                Plan
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                PLan Expiry
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                Subscription Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
  {userData.length > 0 ? (
    userData.map((user) => (
      <tr key={user._id} className="hover:bg-gray-100 transition-all duration-200 border-b border-gray-300">
        <td className="px-6 py-4 text-sm font-bold">{user.fullName}</td>
        <td className="px-6 py-4 text-sm font-bold">{new Date(user.createdAt).toLocaleString()}</td>
        
        {/* ✅ Show Plan Name (Paid Plan or Free Trial) */}
        <td className="px-6 py-4 text-sm font-bold">{user.planName}</td>

        {/* ✅ Show Expiry Date (Plan Expiry or Trial Expiry) */}
        <td className="px-6 py-4 text-sm font-bold">{user.formattedExpiryDate}</td>

        <td className="px-6 py-4 text-sm font-bold">
          <span className={`inline-block py-2 px-8 rounded-md text-sm font-semibold ${
            user.subscriptionStatus === "active"
              ? "bg-red-800 text-white"
              : user.subscriptionStatus === "pending"
              ? "bg-yellow-500 text-white"
              : user.subscriptionStatus === "canceled"
              ? "bg-red-500 text-white"
              : user.subscriptionStatus === "expired"
              ? "bg-gray-500 text-white"
              : "bg-indigo-500 text-white"
          }`}>
            {user.subscriptionStatus.charAt(0).toUpperCase() + user.subscriptionStatus.slice(1)}
          </span>
        </td>

        <td className="px-6 py-4 text-sm font-bold flex items-center space-x-3">
          <button
            onClick={() => openDeleteModal(user._id)}
            className="py-2 px-6 rounded-md font-medium text-red-600 border border-red-600 bg-white hover:bg-red-100 transition-all duration-200 shadow-md"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center py-6 text-gray-500 font-medium">
        No users found.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">
              Do you really want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserList;
