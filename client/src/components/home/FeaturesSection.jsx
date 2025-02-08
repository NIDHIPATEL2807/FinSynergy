import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Calendar, TrendingUp, Trophy } from "lucide-react";

const features = [
  { icon: Brain, title: "Interactive Quizzes", description: "Earn coins by testing your financial knowledge" },
  { icon: Calendar, title: "Daily Challenges", description: "Complete tasks & maintain your learning streak" },
  { icon: TrendingUp, title: "Stock Simulator", description: "Practice trading with virtual currency" },
  { icon: Trophy, title: "Leaderboard", description: "Compete with friends & top traders" },
  { icon: Trophy, title: "Personal Finance", description: "Manage your personal finance effectively" },
];

const FeaturesSection = () => {
  return (
    <div className="relative py-14 px-6 ">
      <h1 className="text-5xl p-10 font-bold ">Key Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10 shadow-2xs">
        {features.map(({ icon: Icon, title, description }, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true });

          return (
            <motion.div
              ref={ref}
              key={index}
              className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-white to-green-50 transition-all duration-300 hover:from-green-100 hover:to-green-200"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={isInView ? { rotateY: 0, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Icon className="w-12 h-12 text-green-950 mb-4  " />
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
