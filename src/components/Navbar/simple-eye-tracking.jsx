import React, { useState, useEffect, useRef } from "react";

export const SimpleEyeTracking = ({ 
  className = "",
  eyeSize = 22,
  eyeGap = 12,
  eyeColor = "#ffffff", 
  pupilColor = "#000000",
  pupilSize = 0.5, // As a fraction of the eye size
  borderWidth = 2, // Border width in pixels
  borderColor = "#000000", // Border color
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      // Get relative position for calculating angle
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setMousePosition({
        x: e.clientX - centerX,
        y: e.clientY - centerY
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate pupil position
  const calculatePupilPosition = (mouseX, mouseY) => {
    const maxDistance = eyeSize * (1 - pupilSize) / 2;
    
    // Calculate angle and distance
    const angle = Math.atan2(mouseY, mouseX);
    const distance = Math.min(Math.sqrt(mouseX * mouseX + mouseY * mouseY), maxDistance);
    
    // Calculate pupil position
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };
  };

  const pupilPosition = calculatePupilPosition(mousePosition.x, mousePosition.y);

  return (
    <div
      ref={containerRef}
      className={`flex items-center gap-${eyeGap/4} ${className}`}
    >
      {/* Left eye */}
      <div
        className="relative rounded-full"
        style={{
          width: eyeSize,
          height: eyeSize,
          backgroundColor: eyeColor,
          border: `${borderWidth}px solid ${borderColor}`,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
        }}
      >
        {/* Left pupil */}
        <div
          className="absolute rounded-full"
          style={{
            width: eyeSize * pupilSize,
            height: eyeSize * pupilSize,
            backgroundColor: pupilColor,
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
          }}
        />
      </div>

      {/* Right eye */}
      <div
        className="relative rounded-full"
        style={{
          width: eyeSize,
          height: eyeSize,
          backgroundColor: eyeColor,
          border: `${borderWidth}px solid ${borderColor}`,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
        }}
      >
        {/* Right pupil */}
        <div
          className="absolute rounded-full"
          style={{
            width: eyeSize * pupilSize,
            height: eyeSize * pupilSize,
            backgroundColor: pupilColor,
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
          }}
        />
      </div>
    </div>
  );
};