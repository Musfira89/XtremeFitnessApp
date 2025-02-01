import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAdminAuth } from '../../context/AdminAuthContext';

const UserMessages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userId } = useParams();
  const { adminAuth } = useAdminAuth(); // Get admin data from context
  const adminId = adminAuth.adminId;  // Get adminId from context
  
  
  
  // Fetch messages
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${userId}`);
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
  
    try {
      const response = await axios.post("http://localhost:5000/api/messages/send", {
        senderId: { _id: userId },  // Send userId as an object
        receiverId: { _id: adminId }, // Send adminId as an object
        content: newMessage,
      });
  
      setMessages([...messages, response.data.message]); // Add new message to state
      setNewMessage(""); // Clear input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-left w-full max-w-2xl mt-11">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Messages with Admin
      </h3>
  
      {/* Chat Container */}
      <div className="h-96 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message._id} className="flex justify-start">
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.senderId === userId
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 text-gray-200 text-right">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
  
      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="mt-4 flex flex-col space-y-2">
        <textarea
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          rows="3"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        ></textarea>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default UserMessages;
