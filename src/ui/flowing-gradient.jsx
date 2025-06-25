import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const FlowingGradient = ({ 
  className = "", 
  intensity = "medium", // options: low, medium, high  
  colorScheme = "default", // options: default, blue, purple, sunset, neon
  blur = "medium", // options: none, low, medium, high
}) => {
  const containerRef = useRef(null);
  
  // Adjust animation speed and blur based on intensity
  const speedMap = {
    low: 40, // Reduced from 50 for faster animation
    medium: 25, // Reduced from 30 for faster animation
    high: 12  // Reduced from 15 for faster animation
  };
  
  const blurMap = {
    none: "blur-none",
    low: "blur-lg",
    medium: "blur-2xl",
    high: "blur-3xl"
  };
  
  // Color schemes with enhanced vibrancy
  const colorSchemes = {
    default: ["#6366f1", "#8b5cf6", "#ec4899", "#10b981"],
    blue: ["#60a5fa", "#3b82f6", "#1e40af", "#0ea5e9"],
    purple: ["#8b5cf6", "#a855f7", "#7e22ce", "#d946ef"],
    sunset: ["#f97316", "#fb923c", "#f43f5e", "#fbbf24"],
    neon: ["#22d3ee", "#10b981", "#4ade80", "#a855f7"]
  };
  
  const colors = colorSchemes[colorScheme] || colorSchemes.default;
  const speed = speedMap[intensity] || speedMap.medium;
  const blurClass = blurMap[blur] || blurMap.medium;
  
  // Create multiple floating orbs for the animated gradient effect
  const generateOrbs = () => {
    // Increase count for more visual interest
    const count = intensity === "high" ? 6 : intensity === "medium" ? 4 : 3;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      // Increased size range for more dramatic effect
      size: Math.random() * 300 + 300,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      color: colors[i % colors.length]
    }));
  };
  
  const orbs = generateOrbs();

  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`} 
      ref={containerRef}
    >
      {/* Base subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/60 opacity-80" />
      
      {/* Animated gradient orbs with improved animation */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full ${blurClass} mix-blend-multiply`}
          style={{
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            opacity: 0.35, // Increased from 0.25 for better visibility
            left: `${orb.initialX}%`,
            top: `${orb.initialY}%`,
            zIndex: 0,
          }}
          animate={{
            x: [
              0, 
              (Math.random() > 0.5 ? 150 : -150) * (intensity === "high" ? 2 : 1.5), // Increased movement range
              0
            ],
            y: [
              0, 
              (Math.random() > 0.5 ? 150 : -150) * (intensity === "high" ? 2 : 1.5), // Increased movement range
              0
            ],
            scale: [1, intensity === "high" ? 1.2 : 1.1, 1] // Added scale animation for more dynamism
          }}
          transition={{
            repeat: Infinity,
            duration: speed,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Add noise texture for more depth */}
      <div 
        className="absolute inset-0 bg-repeat opacity-[0.04] pointer-events-none" // Increased from 0.03 to 0.04
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' fill='%23000000'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
    </div>
  );
};