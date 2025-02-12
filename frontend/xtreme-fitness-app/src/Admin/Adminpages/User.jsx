import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/users"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleActivation = (userId) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user._id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
      setUserData((prevData) => prevData.filter((user) => user._id !== userId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
<section className="w-full h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg flex flex-col">
  <div className="flex-grow overflow-auto p-6">
    <table className="w-full table-auto text-gray-800 border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-red-700 to-red-900 text-white">
          <th className="px-6 py-4 text-left text-sm font-bold uppercase">Name</th>
          <th className="px-6 py-4 text-left text-sm font-bold uppercase">Account Creation</th>
          <th className="px-6 py-4 text-left text-sm font-bold uppercase">Plan</th>
          <th className="px-6 py-4 text-left text-sm font-bold uppercase">Subscription Status</th>
          <th className="px-6 py-4 text-left text-sm font-bold uppercase">Actions</th>
        </tr>
      </thead>
      <tbody>
        {userData.length > 0 ? (
          userData.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-100 transition-all duration-200 border-b border-gray-300"
            >
              <td className="px-6 py-4 text-sm font-bold">{user.fullName}</td>
              <td className="px-6 py-4 text-sm font-bold">
                {formatDate(user.createdAt)}
              </td>
              <td className="px-6 py-4 text-sm font-bold">{user.plan?.name}</td>
              <td className="px-6 py-4 text-sm font-bold">
                <span
                  className={`inline-block py-1 px-3 rounded-full text-xs font-semibold ${
                    user.subscriptionStatus === "active"
                      ? "bg-red-800 text-white"
                      : user.subscriptionStatus === "pending"
                      ? "bg-yellow-500 text-white"
                      : user.subscriptionStatus === "canceled"
                      ? "bg-red-500 text-white"
                      : user.subscriptionStatus === "expired"
                      ? "bg-gray-500 text-white"
                      : "bg-indigo-500 text-white"
                  }`}
                >
                  {user.subscriptionStatus.charAt(0).toUpperCase() +
                    user.subscriptionStatus.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-bold flex items-center space-x-3">
                <button
                  onClick={() => handleToggleActivation(user._id)}
                  className={`py-2 px-4 rounded-md font-medium text-white transition-all duration-200 shadow-md ${
                    user.isActive
                      ? "bg-red-600 hover:bg-red-500"
                      : "bg-red-600 hover:bg-red-500"
                  }`}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="py-2 px-6 rounded-md font-medium text-red-600 border border-red-600 bg-white hover:bg-red-100 transition-all duration-200 shadow-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="5"
              className="text-center py-6 text-gray-500 font-medium"
            >
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</section>


  );
};

export default UserList;
