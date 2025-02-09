import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Import Firebase auth

const HomePageHero = () => {
  const navigate = useNavigate();

  // Initialize AOS on scroll and re-initialize on every scroll
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    window.addEventListener("scroll", () => {
      AOS.refresh();
    });
    return () => {
      window.removeEventListener("scroll", () => {
        AOS.refresh();
      });
    };
  }, []);

  // Function to handle Get Started button click
  const handleGetStarted = () => {
    const user = auth.currentUser; // Get currently signed-in user

    if (user) {
      navigate("/gamified/simulation"); // If signed in, go to Stock VSM
    } else {
      navigate("/signup"); // If not signed in, go to Sign Up
    }
  };

  // Function to handle Join Community button click
  const handleJoinCommunity = () => {
    navigate("/discussionforum"); // Navigate to DiscussionForum component
  };

  return (
    <section className="relative pt-10 pb-16 px-4 bg-textlight">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Rolling FinSynergy */}
        <motion.h1
          className="text-6xl font-extrabold mb-6 leading-tight text-textdark"
          initial={{ y: -10 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          data-aos="fade-up"
        >
          Your <span className="text-teal-900">FinTech </span>journey begins with <br />
          <motion.span
            className="text-teal-900 inline-block font-satoshi"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            Fin
            <span className="text-teal-600">Synergy</span>
          </motion.span>
        </motion.h1>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 gap-10 mb-8">
          <motion.button
            whileHover={{ y: -10 }} // Slide up effect on hover
            className="px-6 py-3 bg-teal-700 text-white rounded-full font-semibold shadow-lg text-lg "
            data-aos="fade-up"
            data-aos-delay="100"
            onClick={handleGetStarted} // Always go to this route
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{ y: -10 }} // Slide up effect on hover
            className="px-8 py-3 bg-white text-textdark rounded-full font-semibold border-3 border-teal-500 shadow-lg text-lg hover:bg-teal-500"
            data-aos="fade-up"
            data-aos-delay="100"
            onClick={handleJoinCommunity} // Navigate to DiscussionForum
          >
            Join Community
          </motion.button>
        </div>

        {/* Personal Finance Section */}
        <div className="mt-10 text-center max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="400">
          <p className="text-lg text-teal-950 mt-2">
            FinSynergy empowers you to take control of your finances with expert guidance, smart budgeting,
            and hands-on trading practice—your financial future, at your fingertips.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HomePageHero;
