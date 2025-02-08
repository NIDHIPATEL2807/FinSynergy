import React from "react";

const DotGrid = ({
  color = "#cacaca",
  size = 20,
  dotSize = 2,
  children,
  className = "",
  style = {},
}) => {
  return (
    <div
      style={{
        ...style,
        backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default DotGrid;
