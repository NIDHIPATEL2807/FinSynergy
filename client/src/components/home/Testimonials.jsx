import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = [
    { text: "I learned how to invest risk-free, and now I'm more confident in real trading!", author: "Sarah J.", role: "Beginner Investor" },
    { text: "The gamification makes learning finance actually fun. Who knew!", author: "Mike R.", role: "Student" },
    { text: "FinSynergy helped me understand complex financial concepts through practice.", author: "Alex T.", role: "Professional" }
  ];

  return (
    <div className="relative bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-xl mb-6">"{testimonials[currentSlide].text}"</p>
          <p className="font-bold">{testimonials[currentSlide].author}</p>
          <p className="text-gray-600">{testimonials[currentSlide].role}</p>
        </motion.div>
        <div className="flex justify-center mt-8 space-x-4">
          <button onClick={() => setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
