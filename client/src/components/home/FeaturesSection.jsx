import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLightbulb, FaWallet, FaCalendarAlt, FaChartLine, FaBrain, FaLock } from "react-icons/fa"; // Importing icons from react-icons

const features = [
  {
    icon: FaLightbulb,  // AI-powered feature icon
    title: "FinBot - AI-Powered Financial Assistant",
    description: "Get personalized financial advice, investment insights, and predictions. FinMate simplifies complex financial terms, offering a smart way to navigate the world of finance."
  },
  {
    icon: FaWallet,  // Finance management icon
    title: "FinMate - Personal Finance Dashboard",
    description: "FinMate helps you manage and track your income, expenses, and financial goals. Visualize your progress with interactive charts and gain insights into your spending habits."
  },
  {
    icon: FaCalendarAlt,  // Community forum icon
    title: "Fin-Connect - Community Forum",
    description: "Join a financial community to ask questions, share insights, and engage with other learners. Enhance your knowledge and grow together."
  },
  {
    icon: FaChartLine,  // Stock simulation icon
    title: "Stock Simulator",
    description: "Dive into real stock market trends with virtual currency. Practice trading, track your performance, and refine your strategies without any financial risk."
  },
  {
    icon: FaBrain,  // Quizzes & challenges icon
    title: "FinEd - Interactive Quizzes & Challenges",
    description: "Test your financial knowledge with engaging quizzes and daily challenges. Earn virtual coins and rewards as you progress, keeping your financial learning fun and streak-based."
  },
  {
    icon: FaLock,  // Quizzes & challenges icon
    title: "Firebase based Authentication",
    description: "Firebase Firestore for data storage and authentication"
  },
];

const FeaturesSection = () => {
  return (
    <div className="relative py-14 px-6 ">
      <h1 className="text-5xl p-10 font-bold text-center font-satoshi ">Key Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10 shadow-2xs">
        {features.map(({ icon: Icon, title, description }, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true });

          return (
            <motion.div
              ref={ref}
              key={index}
              className="p-6 rounded-xl text-center shadow-lg bg-gradient-to-r from-white to-teal-100 transition-all duration-300 hover:from-teal-100 hover:to-teal-400"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={isInView ? { rotateY: 0, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Icon className="w-12 h-12 text-teal-950 mb-4 justify-center" />
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;
