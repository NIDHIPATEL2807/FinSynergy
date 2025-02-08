import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePageHero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="relative pt-20 pb-16 px-4 bg-textlight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Rolling / Bouncing FinSynergy */}
        <motion.h1 
          className="text-6xl font-extrabold mb-6 leading-tight text-textdark"
          initial={{ y: -10 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          data-aos="fade-up"
        >
          Your FinTech journey begins with <br />
          <motion.span
            className="text-blue-600 inline-block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            FinSynergy
          </motion.span>
        </motion.h1>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 gap-10 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg text-lg"
            data-aos="fade-up" 
            data-aos-delay="400"
          >
            Start Learning
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-textdark rounded-full font-semibold border-2 border-blue-600 shadow-lg text-lg"
            data-aos="fade-up" 
            data-aos-delay="500"
          >
            Join Leaderboard
          </motion.button>
        </div>

        

        {/* Personal Finance Section */}
        <div className="mt-10 text-center max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-2xl font-bold text-textdark">Personal Finance</h2>
          <p className="text-md text-gray-700 mt-2">
            FinSynergy empowers you to take control of your finances with expert guidance, smart budgeting, 
            and hands-on trading practice—your financial future, at your fingertips.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HomePageHero;
