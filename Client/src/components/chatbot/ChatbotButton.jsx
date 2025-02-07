import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
// import Chatbot from "./Chatbot";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chatbot Container */}
      {/* {isOpen && <Chatbot onClose={() => setIsOpen(false)} />} */}

      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" /> // Close icon
        ) : (
          <MessageCircle className="w-8 h-8 text-white" /> // Chat icon
        )}
      </motion.button>
    </>
  );
};

export default ChatbotButton;
