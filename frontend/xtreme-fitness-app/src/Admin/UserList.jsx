import React, { useState } from "react";

// Sample user data
const users = [
  { id: 1, name: "John Doe", lastLogin: "2025-01-23 12:45", isActive: true },
  { id: 2, name: "Jane Smith", lastLogin: "2025-01-22 10:30", isActive: false },
  { id: 3, name: "Mike Johnson", lastLogin: "2025-01-21 14:15", isActive: true },
];

const UserList = () => {
  const [userData, setUserData] = useState(users);

  const handleToggleActivation = (userId) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <section className="w-full bg-gray-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-gray-800">
          <thead>
            <tr className="text-left border-b border-gray-300 bg-gray-200">
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Last Login</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 transition-all duration-200 ease-in-out border-b border-gray-200"
              >
                <td className="px-6 py-4 text-sm">{user.name}</td>
                <td className="px-6 py-4 text-sm">{user.lastLogin}</td>
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
                    onClick={() => handleToggleActivation(user.id)}
                    className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-500 text-white py-2 px-6 rounded-full text-sm focus:outline-none transform transition-all duration-200 shadow-md hover:scale-105"
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserList;
