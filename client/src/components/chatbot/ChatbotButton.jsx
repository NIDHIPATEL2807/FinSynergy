import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatbotWindow = () => {
    window.open("http://localhost:3000", "_blank"); // Opens another localhost file in a new tab
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 bg-teal-800 rounded-full flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openChatbotWindow}
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

