import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { FaPaperPlane } from "react-icons/fa";

const UserMessages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userId } = useParams();
  const { adminAuth } = useAdminAuth();
  const adminId = adminAuth.adminId;
  const messagesEndRef = useRef(null);

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
        senderId: userId,
        receiverId: adminId,
        content: newMessage,
      });

      setMessages([...messages, response.data.message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  return (
    <div className="max-w-[40%] w-4/5 ml-2 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-left">
        💬 Chat with Admin
      </h3>

      {/* Chat Container */}
      <div className="h-96 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-left">No messages yet.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li
                key={message._id}
                className="flex justify-start"
              >
                <div
                  className={`max-w-xs px-4 py-2 text-sm rounded-2xl shadow-md ${
                    message.senderId === userId
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-bl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 text-gray-300 text-right">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="mt-4 flex items-center space-x-2">
        <textarea
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all resize-none"
          rows="2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        ></textarea>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all shadow-md"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default UserMessages;
