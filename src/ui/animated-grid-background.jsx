import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const AnimatedGridBackground = ({ 
  children, 
  className = "", 
  containerClassName = "",
  gridSize = 40, 
  blur = 10,
  speed = 1,
  animate = true,
  hue = 0
}) => {
  const ref = useRef(null);
  
  // Create grid cells with their properties
  const createGrid = () => {
    const columns = Math.floor(document.body.clientWidth / gridSize);
    const rows = Math.floor(document.body.clientHeight / gridSize);
    
    return Array.from({ length: columns * rows }).map((_, i) => {
      const column = i % columns;
      const row = Math.floor(i / columns);
      
      // Create randomness for subtle visual interest
      const opacity = Math.random() * 0.5;
      const delay = Math.random() * speed;
      
      return {
        id: i,
        column,
        row,
        opacity,
        delay
      };
    });
  };

  const gridRef = useRef(createGrid());

  useEffect(() => {
    const handleResize = () => {
      gridRef.current = createGrid();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [gridSize]);
  
  return (
    <div className={`relative overflow-hidden ${containerClassName}`} ref={ref}>
      {animate && (
        <div
          className="absolute inset-0 filter blur-[10px] opacity-10"
          style={{ filter: `blur(${blur}px)` }}
        >
          {gridRef.current.map(({ id, column, row, opacity, delay }) => (
            <motion.div
              key={id}
              className="absolute bg-black"
              style={{
                width: gridSize,
                height: gridSize,
                left: column * gridSize,
                top: row * gridSize,
                opacity: 0,
              }}
              animate={{
                opacity: [0, opacity, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 5 * speed,
                delay: delay,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      )}
      <div className={className}>{children}</div>
    </div>
  );
};