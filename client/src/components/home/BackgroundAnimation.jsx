import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => (
  <motion.div 
    className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-8 h-8 rounded-full bg-yellow-400/20"
        initial={{ x: Math.random() * window.innerWidth, y: -20 }}
        animate={{ y: window.innerHeight + 20 }}
        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear" }}
      />
    ))}
  </motion.div>
);

export default BackgroundAnimation;
