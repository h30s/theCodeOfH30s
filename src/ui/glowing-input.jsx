import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const GlowingInput = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  variant = "default", // "default" | "white"
  as = "input", // "input" | "textarea"
  rows = 5,
  blur = 5, // Increased blur for more intensity
  borderWidth = 2,
  travelSpeed = 2.5, // Speed of the traveling glow (lower = faster)
  glowColor = "#3498db", // Base color for the glow effect
  glowSize = 45, // Size of the traveling glow in degrees (smaller for faster appearance)
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lastTypingTime, setLastTypingTime] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [position, setPosition] = useState(0); // Position of the traveling glow (0-360 degrees)
  const [isAnimating, setIsAnimating] = useState(false);
  const typingTimeout = useRef(null);
  
  // Start animation when the input is focused
  useEffect(() => {
    if (isFocused && !isAnimating) {
      setIsAnimating(true);
    } else if (!isFocused && isAnimating) {
      // Allow animation to complete one cycle before stopping
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [isFocused, isAnimating]);

  // Handle typing detection
  useEffect(() => {
    if (lastTypingTime > 0) {
      setIsTyping(true);
      
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      
      typingTimeout.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000); // Consider typing stopped after 1 second of inactivity
    }
    
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [lastTypingTime]);
  
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e) => {
    setLastTypingTime(Date.now());
    if (onChange) {
      onChange(e);
    }
  };

  const InputComponent = as === "textarea" ? "textarea" : "input";
  
  // Enhanced color gradients with more vibrant colors
  const getGradientColors = () => {
    // For default theme - more vibrant colors
    const baseColors = variant === "white" 
      ? ['rgba(255,255,255,0.8)', 'rgba(240,240,240,0.8)'] 
      : ['#ff6bcb', '#ffb86c', '#2cccff', '#20e3b2', '#ff6bcb'];
    
    // The main glow color - brighter when typing
    const primaryColor = variant === "white" 
      ? 'rgba(255,255,255,1)' 
      : isTyping ? '#ffffff' : '#f0f0ff';
    
    // Modify intensity based on typing state
    const intensityMultiplier = isTyping ? 1.5 : 1;
    
    // Create color stops for the gradient with adjusted intensity
    return `conic-gradient(
      from ${position}deg at 50% 50%,
      ${baseColors[0]} 0deg,
      ${primaryColor} ${position}deg,
      ${primaryColor} ${position + (glowSize * intensityMultiplier)}deg,
      ${baseColors[1 % baseColors.length]} ${position + (glowSize * intensityMultiplier) + 5}deg,
      ${baseColors[2 % baseColors.length]} ${position + 180}deg,
      ${baseColors[0]} 360deg
    )`;
  };

  // Speed control - adjust how quickly the position increments
  const speedFactor = isTyping ? 2 : 1; // Double speed when typing

  // Calculate position increment based on speed settings
  const getPositionIncrement = () => {
    const baseIncrement = 360 / (60 * travelSpeed); // Full circle in travelSpeed seconds at 60fps
    return baseIncrement * speedFactor;
  };

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div ref={containerRef} className="relative">
        {/* Input Element with additional styling to completely remove default focus ring */}
        <InputComponent
          ref={inputRef}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          rows={as === "textarea" ? rows : undefined}
          className={`
            w-full px-4 py-3 rounded-lg bg-white transition-all
            focus:outline-0 focus:ring-0 focus:ring-offset-0 
            focus:border-transparent outline-none
            relative z-10
            ${className}
            ${as === "textarea" ? "resize-none" : ""}
          `}
          style={{
            border: `1px solid ${isFocused ? 'transparent' : '#e5e7eb'}`,
            boxShadow: 'none',
            outline: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
          }}
        />
        
        {/* Border with traveling glow effect - with enhanced animations */}
        <motion.div 
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{ opacity: isFocused || isAnimating ? 1 : 0 }}
          animate={{ 
            opacity: isFocused || isAnimating ? 1 : 0,
            scale: isTyping ? [1, 1.01, 1] : 1,
          }}
          transition={{ 
            duration: 0.3,
            scale: {
              duration: 0.2,
              repeat: isTyping ? Infinity : 0,
              repeatType: "reverse"
            }
          }}
        >
          {/* This creates the border-only effect with enhanced glow */}
          <motion.div 
            className="absolute inset-0 rounded-lg"
            style={{
              padding: "1px", // Creates space for the gradient to show
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              background: getGradientColors(),
              filter: `blur(${isTyping ? blur * 1.5 : blur}px)`,
            }}
            animate={{
              // Animate the position from 0 to 360 degrees and repeat
              background: [getGradientColors()],
            }}
            onUpdate={() => {
              if (isFocused || isAnimating) {
                // Update position based on speed setting and typing state
                setPosition((prevPos) => (prevPos + getPositionIncrement()) % 360);
              }
            }}
            transition={{
              duration: 0.01,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Sharp border on top of the glow */}
          <div 
            className="absolute inset-0 rounded-lg"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "1px", // Creates space for the gradient to show
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
            }}
          />
          
          {/* Additional typing effect - subtle pulsing glow */}
          {isTyping && (
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                padding: "1px",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                background: "rgba(255, 255, 255, 0.4)",
                filter: "blur(8px)",
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};