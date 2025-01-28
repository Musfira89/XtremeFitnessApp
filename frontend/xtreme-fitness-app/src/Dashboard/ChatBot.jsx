import React, { useState } from "react";
import { MessageCircle } from "lucide-react"; // Import icon from lucide-react or any icon library

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi there! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: "user", text: input }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "Thank you for your message! I'm here to help." },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-red-500 w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-red-600 transition"
      >
        <MessageCircle className="text-white w-6 h-6" />
      </div>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white w-80 h-96 shadow-xl rounded-2xl flex flex-col">
          {/* Header */}
          <div className="bg-red-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <h2 className="text-lg font-semibold">Chat Support</h2>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } px-4 py-2 rounded-2xl max-w-[70%]`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-4 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-2xl shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
