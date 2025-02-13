import React, { useState, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import axios from "axios";
import { useAdminAuth } from '../../context/AdminAuthContext';

const Message = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { adminAuth } = useAdminAuth(); 
  const adminId = adminAuth.adminId; 

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/users");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch Messages from the server
  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${userId}`);
      setMessages(response.data.data);
      // Store fetched messages in localStorage
      localStorage.setItem('messages', JSON.stringify(response.data.data));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle User Selection
  const handleUserSelect = (e) => {
    const userName = e.target.value;
    setSelectedUser(userName);

    const receiver = userData.find(user => user.fullName === userName);
    if (receiver) fetchMessages(receiver._id);
  };

  // Send Message
  const handleSendMessage = async () => {
    if (!selectedUser || !message) {
      alert("Please select a user and enter a message.");
      return;
    }

    const receiver = userData.find(user => user.fullName === selectedUser);
    if (!receiver) {
      alert("User not found.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/messages/send", {
        senderId: adminId,  // Pass adminId directly as a string
        receiverId: receiver._id,  // Pass receiverId directly as a string
        content: message,
      });

      // Add new message to the UI
      const newMessages = [...messages, response.data.data];
      setMessages(newMessages);
      // Store updated messages in localStorage
      localStorage.setItem('messages', JSON.stringify(newMessages));
      setMessage(""); // Clear message input
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  // Load messages from localStorage when the component mounts
  useEffect(() => {
    fetchUsers();
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mt-6 border border-gray-200 dark:border-gray-700 w-full max-w-2xl ml-0">
      {/* Title */}
      <h3 className="text-xl font-semibold text-red-600 flex items-center mb-6">
        <FaComments className="mr-3 text-2xl" />
        Admin Communication
      </h3>

      {/* Select User */}
      <div className="mb-5">
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Select User
        </label>
        <select
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          value={selectedUser}
          onChange={handleUserSelect}
        >
          <option value="">Select a User</option>
          {userData.map(user => (
            <option key={user._id} value={user.fullName}>
              {user.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* Messages Display */}
      {selectedUser && (
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl mb-5 max-h-60 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-md w-fit max-w-xs ${
                  msg.sender === adminId
                    ? "bg-red-500 text-white ml-auto" // Admin message - red and right-aligned
                    : "bg-gray-300 text-black"        // User message - gray and left-aligned
                }`}
              >
                <span className="block text-sm">{msg.content}</span>
                <span className="block text-xs opacity-80">
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          )}
        </div>
      )}

      {/* Message Input */}
      {selectedUser && (
        <div>
          <textarea
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          ></textarea>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-transform transform hover:scale-[1.02] mt-3"
          >
            Send Message
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;
