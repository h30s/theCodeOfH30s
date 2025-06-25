import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const GridAnimation = ({
  className = "",
  cellSize = 40,
  color = "#000",
  opacity = 0.07,
  animationSpeed = 10,
  variant = "wave", // options: wave, pulse, random, ripple
  hoverEffect = true
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Calculate grid dimensions based on window size
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Create grid cells  
  const rows = Math.ceil(dimensions.height / cellSize);
  const cols = Math.ceil(dimensions.width / cellSize);
  
  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push({ row, col });
    }
  }

  // Handle mouse movement for hover interactions
  const handleMouseMove = (e) => {
    if (!hoverEffect) return;
    
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full">
        {cells.map(({ row, col }, index) => {
          const x = col * cellSize;
          const y = row * cellSize;
          
          // Determine animation based on variant
          let animation = {};
          let transition = {};
          
          // Distance from mouse for ripple effect
          const distanceFromMouse = hoverEffect && isHovering
            ? Math.sqrt(
                Math.pow(x - mousePosition.x + cellSize / 2, 2) + 
                Math.pow(y - mousePosition.y + cellSize / 2, 2)
              )
            : 0;
          
          switch (variant) {
            case "wave":
              const delay = (row + col) * 0.05 % 1;
              animation = {
                opacity: [opacity * 0.5, opacity, opacity * 0.5]
              };
              transition = {
                duration: animationSpeed,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
              };
              break;
              
            case "pulse":
              const pulseDelay = Math.abs(Math.sin(row * col)) * 2;
              animation = {
                scale: [1, 1.2, 1],
                opacity: [opacity * 0.5, opacity, opacity * 0.5]
              };
              transition = {
                duration: animationSpeed,
                repeat: Infinity,
                delay: pulseDelay,
                ease: "easeInOut"
              };
              break;
              
            case "random":
              const randomDelay = Math.random() * 5;
              const randomDuration = 5 + Math.random() * animationSpeed;
              animation = {
                opacity: [opacity * 0.3, opacity, opacity * 0.3]
              };
              transition = {
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "easeInOut"
              };
              break;
              
            case "ripple":
              // Only animate if hovering
              if (hoverEffect && isHovering) {
                const maxDistance = Math.sqrt(
                  Math.pow(dimensions.width, 2) + 
                  Math.pow(dimensions.height, 2)
                );
                const normalizedDistance = distanceFromMouse / maxDistance;
                const rippleDelay = normalizedDistance * (animationSpeed / 10);
                
                animation = {
                  scale: [1, 1.5, 1],
                  opacity: [opacity * 0.5, opacity * 1.5, opacity * 0.5]
                };
                transition = {
                  duration: animationSpeed / 3,
                  repeat: 0,
                  delay: rippleDelay,
                  ease: "easeOut"
                };
              } else {
                animation = {
                  opacity: opacity * 0.5
                };
                transition = {
                  duration: 0.5
                };
              }
              break;
              
            default:
              animation = {
                opacity: opacity
              };
              transition = {
                duration: 0.5
              };
          }
          
          // Apply additional hover effect if enabled
          if (hoverEffect && isHovering && variant !== "ripple") {
            const maxDistance = 300; // Max distance for hover effect
            if (distanceFromMouse < maxDistance) {
              const hoverIntensity = 1 - (distanceFromMouse / maxDistance);
              animation = {
                ...animation,
                scale: 1 + (hoverIntensity * 0.5),
                opacity: opacity + (hoverIntensity * opacity * 2)
              };
            }
          }
          
          return (
            <motion.div
              key={index}
              className="absolute border-r border-b"
              style={{
                left: x,
                top: y,
                width: cellSize,
                height: cellSize,
                borderColor: color,
                backgroundColor: "transparent",
              }}
              initial={{ opacity: opacity * 0.5 }}
              animate={animation}
              transition={transition}
            />
          );
        })}
      </div>
    </div>
  );
};