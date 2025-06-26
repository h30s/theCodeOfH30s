import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const Card3D = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate rotation based on mouse position
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5; // Max 5 degrees
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 5; // Max 5 degrees

    // Calculate position for the spotlight effect
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-96 rounded-2xl overflow-hidden"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full relative rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transition: { type: "spring", stiffness: 100, damping: 10 },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image container with parallax effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{
              x: isHovered ? rotation.y * -3 : 0,
              y: isHovered ? rotation.x * 3 : 0,
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end transform-style-3d">
          <motion.div
            animate={{
              z: isHovered ? 50 : 0,
              transition: { type: "spring", stiffness: 80, damping: 15 },
            }}
            className="transform-style-3d"
          >
            <motion.h3
              className="text-xl font-bold text-white mb-2"
              animate={{
                y: isHovered ? -5 : 0,
                transition: { type: "spring", stiffness: 100 },
              }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="text-gray-300 text-sm mb-4 line-clamp-2"
              animate={{
                y: isHovered ? -3 : 0,
                opacity: isHovered ? 1 : 0.7,
                transition: { type: "spring", stiffness: 100, delay: 0.05 },
              }}
            >
              {project.description}
            </motion.p>
            <motion.div
              className="flex gap-2 mb-4"
              animate={{
                y: isHovered ? -2 : 0,
                opacity: isHovered ? 1 : 0.5,
                transition: { type: "spring", stiffness: 100, delay: 0.1 },
              }}
            >
              {project.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Spotlight effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)`
              : "none",
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Visit button with reveal animation */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium flex items-center gap-2 shadow-lg hover:bg-opacity-90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                View Project <ArrowUpRight size={16} />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const ProjectCardGrid = ({ projects }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <motion.span
          className="block mb-3 text-sm font-medium tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          MY WORK
        </motion.span>
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Featured Projects
        </motion.h2>
      </div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card3D key={project.title} project={project} index={index} />
        ))}
      </div>


    </div>
  );
};

export default ProjectCardGrid;
