import React from "react";
import { motion } from "framer-motion";

const HomePageHero = () => {
  return (
    <section className="relative pt-20 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }} // Smooth animation
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl font-bold mb-6">
          Master Finance the Fun Way! 🎮💰
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Take quizzes, complete challenges & trade virtually – all risk-free!
        </p>
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg"
          >
            Start Learning
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold border-2 border-blue-600 shadow-lg"
          >
            Join Leaderboard
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HomePageHero;
