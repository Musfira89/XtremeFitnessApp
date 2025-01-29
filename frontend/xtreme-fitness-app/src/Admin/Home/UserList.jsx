import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/users"); // Adjust the API endpoint
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
      setUserData((prevData) => prevData.filter((user) => user._id !== userId)); // Remove user from state
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to format date as Day, Date, Time (e.g., "Mon, Jan 30, 2025 10:20 AM")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short", // Short weekday (Mon, Tue, ...)
      month: "short", // Short month (Jan, Feb, ...)
      day: "numeric", // Numeric day (1, 2, 3, ...)
      year: "numeric", // Numeric year (2025)
      hour: "2-digit", // Hour (10)
      minute: "2-digit", // Minute (20)
      hour12: true, // 12-hour format (AM/PM)
    });
  };

  return (
    <section className="w-full bg-gradient-to-r from-gray-50 to-white p-10 rounded-2xl shadow-lg">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">User List</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full table-auto text-gray-800">
          <thead>
            <tr className="text-left  bg-red-800">
              <th className="px-6 py-3 text-sm font-medium text-white">Name</th>
              <th className="px-6 py-3 text-sm font-medium text-white">Account Creation</th>
              <th className="px-6 py-3 text-sm font-medium text-white">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0 ? (
              userData.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition-all duration-200 ease-in-out border-b border-gray-200"
                >
                  <td className="px-6 py-4 text-sm font-medium">{user.fullName}</td>
                  <td className="px-6 py-4 text-sm">
                    <strong>{formatDate(user.createdAt)}</strong>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block py-1 px-3 rounded-full text-xs font-semibold ${
                        user.isActive
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleToggleActivation(user._id)}
                      className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 text-white py-2 px-6 rounded-lg text-sm focus:outline-none transform transition-all duration-200 shadow-md"
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="ml-2 border-2 border-red-500 text-red-500 py-2 px-6 rounded-lg text-sm focus:outline-none transform transition-all duration-200 shadow-md hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
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
