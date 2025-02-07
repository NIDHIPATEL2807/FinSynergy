import React from "react";
import { motion } from "framer-motion";
import { Brain, Calendar, TrendingUp, Trophy } from "lucide-react"; // Ensure icons are imported

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="p-6 bg-white rounded-xl shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="w-12 h-12 text-blue-600 mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

// Feature List
const features = [
  {
    icon: Brain,
    title: "Interactive Quizzes",
    description: "Earn coins by testing your financial knowledge",
  },
  {
    icon: Calendar,
    title: "Daily Challenges",
    description: "Complete tasks & maintain your learning streak",
  },
  {
    icon: TrendingUp,
    title: "Stock Simulator",
    description: "Practice trading with virtual currency",
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    description: "Compete with friends & top traders",
  },

  {
    icon: Trophy,
    title: "Personal Finance ",
    description: "Manage your Personal Finance",
  },
];

// Features Section
const FeaturesSection = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {features.map((feature, index) => (
      <FeatureCard key={index} {...feature} />
    ))}
  </div>
);

export default FeaturesSection;
