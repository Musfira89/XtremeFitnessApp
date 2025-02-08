import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Chatbot Icon */}
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-red-700 w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-red-600 transition"
      >
        <MessageCircle className="text-white w-6 h-6" />
      </div>

      {/* Chatbot Panel - Curved & Slightly Smaller */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white w-[400px] h-[550px] shadow-2xl rounded-[30px] flex flex-col overflow-hidden">
          {/* Header */}


          {/* Chatbase Chatbot - Adjusted Size */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/kSePlw9x-Vd_uxSRdy09A"
            className="flex-1"
            width="100%"
            style={{ height: "100%", minHeight: "500px", borderRadius: "0 0 30px 30px" }}
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default ChatBot;
