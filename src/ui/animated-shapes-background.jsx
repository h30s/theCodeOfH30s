import React from "react";
import { motion } from "framer-motion";

export const AnimatedShapesBackground = ({ 
  variant = "default", // options: default, grid, blob, geometric
  className = "", 
  intensity = "medium", // options: low, medium, high
  baseColor = "#6366f1", // Base color for shapes
  accentColor = "#8b5cf6", // Accent color for shapes
  tertiaryColor = "#ec4899" // Third color for shapes
}) => {
  // Determine quantity and animation speed based on intensity
  const quantityMap = {
    low: { shapes: 7, speed: 1.2 }, // Increased from 5 shapes
    medium: { shapes: 12, speed: 0.8 }, // Increased from 10 shapes
    high: { shapes: 18, speed: 0.5 } // Increased from 15 shapes
  };
  
  const { shapes, speed } = quantityMap[intensity] || quantityMap.medium;
  
  // Create an array of random shapes based on the quantity
  const generateShapes = () => {
    return Array.from({ length: shapes }).map((_, index) => {
      // Random values for each shape
      const size = Math.random() * 250 + 100; // Increased size range
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const delay = Math.random() * 5;
      
      return { id: index, size, xPos, yPos, delay };
    });
  };
  
  const shapesArray = generateShapes();
  
  // Blob variant component
  const BlobVariant = () => (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {shapesArray.map(shape => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full blur-3xl mix-blend-multiply"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.xPos}%`,
            top: `${shape.yPos}%`,
            backgroundColor: [baseColor, accentColor, tertiaryColor][shape.id % 3],
            opacity: 0.25, // Increased from 0.20
          }}
          animate={{
            x: [0, 50 * (Math.random() > 0.5 ? 1 : -1), 0], // Increased movement from 30 to 50
            y: [0, 50 * (Math.random() > 0.5 ? 1 : -1), 0], // Increased movement from 30 to 50
            scale: [1, 1.15, 1], // Increased scale effect
          }}
          transition={{
            repeat: Infinity,
            duration: speed * (5 + shape.id % 3),
            delay: shape.delay,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
  
  // Geometric variant component
  const GeometricVariant = () => (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {shapesArray.map(shape => {
        const shapeType = shape.id % 3;
        let ShapeElement;
        
        switch (shapeType) {
          case 0: // Triangle
            ShapeElement = (
              <motion.div
                className="absolute opacity-15" // Increased from opacity-10
                style={{
                  left: `${shape.xPos}%`,
                  top: `${shape.yPos}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [0.7, 1.2, 0.7] // More dramatic scale animation
                }}
                transition={{
                  repeat: Infinity,
                  duration: speed * 16, // Faster animation
                  delay: shape.delay,
                  ease: "linear"
                }}
              >
                <div 
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: `${shape.size * 0.5}px solid transparent`,
                    borderRight: `${shape.size * 0.5}px solid transparent`,
                    borderBottom: `${shape.size * 0.8}px solid ${baseColor}`,
                  }}
                />
              </motion.div>
            );
            break;
          case 1: // Square
            ShapeElement = (
              <motion.div
                className="absolute opacity-15" // Increased from opacity-10
                style={{
                  width: shape.size * 0.8,
                  height: shape.size * 0.8,
                  left: `${shape.xPos}%`,
                  top: `${shape.yPos}%`,
                  backgroundColor: accentColor,
                }}
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                  scale: [0.7, 1.2, 0.7] // More dramatic scale animation
                }}
                transition={{
                  repeat: Infinity,
                  duration: speed * 20, // Faster animation
                  delay: shape.delay,
                  ease: "easeInOut"
                }}
              />
            );
            break;
          case 2: // Circle
            ShapeElement = (
              <motion.div
                className="absolute rounded-full opacity-15" // Increased from opacity-10
                style={{
                  width: shape.size,
                  height: shape.size,
                  left: `${shape.xPos}%`,
                  top: `${shape.yPos}%`,
                  backgroundColor: tertiaryColor,
                }}
                animate={{
                  scale: [1, 1.3, 1], // More dramatic scale
                  opacity: [0.1, 0.18, 0.1] // More pronounced opacity change
                }}
                transition={{
                  repeat: Infinity,
                  duration: speed * 12, // Faster animation
                  delay: shape.delay,
                  ease: "easeInOut"
                }}
              />
            );
            break;
        }
        
        return <React.Fragment key={shape.id}>{ShapeElement}</React.Fragment>;
      })}
    </div>
  );
  
  // Grid variant component
  const GridVariant = () => {
    // Create a grid of dots
    const gridSize = intensity === 'high' ? 24 : intensity === 'medium' ? 18 : 12; // Increased grid density
    const gridArray = Array.from({ length: gridSize * gridSize });
    
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0 grid" 
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {gridArray.map((_, index) => {
            const row = Math.floor(index / gridSize);
            const col = index % gridSize;
            const delay = (row + col) * 0.03; // Faster sequence
            
            return (
              <motion.div 
                key={index} 
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.12, 0.35, 0.12], // Increased opacity
                  scale: [1, 1.3, 1] // Increased scale effect
                }}
                transition={{
                  repeat: Infinity,
                  duration: speed * 4, // Faster animation
                  delay: delay,
                  ease: "easeInOut"
                }}
              >
                <div 
                  className="rounded-full"
                  style={{ 
                    backgroundColor: (row + col) % 3 === 0 ? baseColor : (row + col) % 3 === 1 ? accentColor : tertiaryColor,
                    width: '5px', // Increased from 4px
                    height: '5px', // Increased from 4px
                    opacity: 0.4 // Increased from 0.3
                  }} 
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Default variant component - combines elements from other variants
  const DefaultVariant = () => (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Backdrop blurred shapes */}
      {shapesArray.slice(0, 5).map(shape => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full blur-3xl mix-blend-multiply"
          style={{
            width: shape.size * 1.8, // Increased size from 1.5
            height: shape.size * 1.8, // Increased size from 1.5
            left: `${shape.xPos}%`,
            top: `${shape.yPos}%`,
            backgroundColor: [baseColor, accentColor, tertiaryColor][shape.id % 3],
            opacity: 0.15, // Increased from 0.10
          }}
          animate={{
            x: [0, 60 * (Math.random() > 0.5 ? 1 : -1), 0], // Increased movement from 40 to 60
            y: [0, 60 * (Math.random() > 0.5 ? 1 : -1), 0], // Increased movement from 40 to 60
          }}
          transition={{
            repeat: Infinity,
            duration: speed * (16 + shape.id % 5), // Faster animation
            delay: shape.delay,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      ))}
      
      {/* Floating geometric elements */}
      {shapesArray.slice(5).map(shape => {
        const shapeType = shape.id % 3;
        let ShapeElement;
        
        switch (shapeType) {
          case 0:
            ShapeElement = (
              <motion.div
                className="absolute border-2 border-opacity-30 rounded-lg opacity-30" // Increased from border-opacity-20 and opacity-20
                style={{
                  width: shape.size * 0.35, // Increased size from 0.3
                  height: shape.size * 0.35, // Increased size from 0.3
                  left: `${shape.xPos}%`,
                  top: `${shape.yPos}%`,
                  borderColor: baseColor,
                  transform: `rotate(${shape.id * 45}deg)`,
                }}
                animate={{
                  y: [0, -30, 0], // Increased movement from -20 to -30
                  rotate: [0, 120], // Increased rotation from 90 to 120
                  opacity: [0.15, 0.3, 0.15] // Increased opacity
                }}
                transition={{
                  repeat: Infinity,
                  duration: speed * 8, // Faster animation
                  delay: shape.delay,
                  ease: "easeInOut"
                }}
              />
            );
            break;
          case 1:
            ShapeElement = (
              <motion.div
                className="absolute rounded-full opacity-30" // Increased from opacity-20
                style={{
                  width: shape.size * 0.25, // Increased size from 0.2
                  height: shape.size * 0.25, // Increased size from 0.2
                  left: `${shape.xPos}%`,
                  top: `${shape.yPos}%`,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: accentColor,
                  borderRadius: '50%',
                }}
                animate={{
                  y: [0, 40, 0], // Increased movement from 30 to 40
                  scale: [1, 1.2, 1] // Increased scale
                }}
                transition={{
                  repeat: Infinity,
                  duration: speed * 12, // Faster animation
                  delay: shape.delay,
                  ease: "easeInOut"
                }}
              />
            );
            break;
          case 2:
            const dotSize = shape.size * 0.06; // Increased size from 0.05
            ShapeElement = (
              <motion.div
                className="absolute opacity-30" // Increased from opacity-20
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: '50%',
                  left: `${shape.xPos}%`,
                  top: `${shape.yPos}%`,
                  backgroundColor: tertiaryColor,
                }}
                animate={{
                  y: [0, 70, 0], // Increased movement from 50 to 70
                  opacity: [0.25, 0.6, 0.25] // Increased opacity
                }}
                transition={{
                  repeat: Infinity,
                  duration: speed * 16, // Faster animation
                  delay: shape.delay,
                  ease: "easeInOut"
                }}
              />
            );
            break;
        }
        
        return <React.Fragment key={shape.id}>{ShapeElement}</React.Fragment>;
      })}
    </div>
  );

  // Render the variant based on the prop
  const renderVariant = () => {
    switch (variant) {
      case 'blob':
        return <BlobVariant />;
      case 'geometric':
        return <GeometricVariant />;
      case 'grid':
        return <GridVariant />;
      case 'default':
      default:
        return <DefaultVariant />;
    }
  };

  return renderVariant();
};