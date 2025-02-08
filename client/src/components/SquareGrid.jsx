import React from "react";

const SquareGrid = ({ color = "#cacaca", size = 20, children, className = "", style = {} }) => {
  return (
    <div
      style={{
        ...style,
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(to right, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        backgroundColor: "white",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default SquareGrid;
