"use client";

import React from "react";
import { motion } from "framer-motion";

const tickerItems = [
  { name: "S&P 500 Index", price: "4,500", change: "+0.5%", color: "text-green-500" },
  { name: "US 100 Cash CFD", price: "15,200", change: "-0.3%", color: "text-red-500" },
  { name: "EUR to USD", price: "1.10", change: "+0.2%", color: "text-green-500" },
  { name: "Bitcoin", price: "$45,000", change: "+2.1%", color: "text-green-500" },
  { name: "Apple Inc", price: "$175.50", change: "-1.2%", color: "text-red-500" },
  { name: "Alphabet Inc", price: "$135.20", change: "+0.8%", color: "text-green-500" },
];

const StockTicker = () => {
  return (
    <div className="overflow-hidden bg-teal-800  text-white py-3">
      <motion.div
        className="flex space-x-12 whitespace-nowrap"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {tickerItems.concat(tickerItems).map((item, index) => ( // Duplicated for seamless loop
          <div key={index} className="flex items-center gap-  space-x-3 min-w-max">
            <span className="font-semibold">{item.name}</span>
            <span className="text-sm">${item.price}</span>
            <span className={`text-sm ${item.color}`}>{item.change}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default StockTicker;
