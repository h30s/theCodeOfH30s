import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, ChevronRight, ArrowUpRight, Tag, Code, Layers, X, ChevronUp } from 'lucide-react';
import './macbook-scroll.css';

const AceternityProjectShowcase = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6); // For pagination
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For image gallery
  const projectsRef = useRef(null);

  // Get unique categories from projects
  const categories = ['all', ...new Set(projects.map(project => project.category.toLowerCase()))];

  // Filter projects based on selected category only (removed search query filter)
  const filteredProjects = projects
    .filter(project => filter === 'all' || project.category.toLowerCase() === filter);
  
  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Reset visible projects count when filter changes
  useEffect(() => {
    setVisibleProjects(6);
  }, [filter]); // Removed searchQuery dependency
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: projectsRef.current.offsetTop - 100,
      behavior: 'smooth'
    });
  };
  
  // Load more projects
  const loadMoreProjects = () => {
    setVisibleProjects(prev => prev + 6);
  };

  // Get the current visible projects
  const currentProjects = filteredProjects.slice(0, visibleProjects);

  return (
    <div className="w-full py-8" ref={projectsRef}>
      {/* Filter container with left-aligned title */}
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          {/* Left-aligned section title */}
          <h2 className="text-3xl font-bold text-left"></h2>
          
          {/* Category filters - responsive design */}
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 flex items-center shadow-md overflow-x-auto max-w-full scrollbar-hide">
            <div className="flex px-2 py-1 min-w-max">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`relative whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    filter === category 
                      ? 'text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {filter === category && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-black"
                      layoutId="activeCategoryBg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 capitalize">{category}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project grid layout */}
      <div className="px-4 max-w-7xl mx-auto">
        {filteredProjects.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div 
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.4,
                staggerChildren: 0.1,
                when: "beforeChildren"
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              {currentProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id || project.title} 
                  project={project} 
                  index={index}
                  setSelectedProject={setSelectedProject}
                  hoverIndex={hoverIndex}
                  setHoverIndex={setHoverIndex}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl font-bold text-gray-700">No projects found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filter criteria</p>
            <button
              onClick={() => {
                setFilter('all');
              }}
              className="mt-4 bg-black text-white px-5 py-2 rounded-full text-sm font-medium"
            >
              Reset filters
            </button>
          </motion.div>
        )}
        
        {/* Load more button */}
        {filteredProjects.length > visibleProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={loadMoreProjects}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm transition-all duration-300 hover:shadow"
            >
              Load more projects
              <ChevronDown size={18} />
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Scroll to top button */}
      {showScrollButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 bg-black text-white p-3 rounded-full shadow-lg z-40"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
      
      {/* Project Modal with Image Gallery */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

// Extracted ProjectCard component for better organization
const ProjectCard = ({ project, index, setSelectedProject, hoverIndex, setHoverIndex }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={cardRef}
      key={project.id || project.title}
      layout
      className="group relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6,
          delay: index * 0.1 
        }
      } : {}}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(null)}
      onClick={() => setSelectedProject(project)}
    >
      {/* Project thumbnail with overlay */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Hover overlay with project details */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-end p-5 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoverIndex === index ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="backdrop-blur-sm bg-black/30 rounded-lg p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg font-bold mb-2">{project.title}</h3>
            <p className="text-sm text-white/90 line-clamp-2 mb-3">{project.description}</p>
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: hoverIndex === index ? 1 : 0, y: hoverIndex === index ? 0 : 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <a
                href={project.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black text-xs font-medium px-3 py-2 rounded-md flex items-center gap-1.5 hover:bg-gray-100 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} /> Visit
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-md flex items-center gap-1.5 hover:bg-white/30 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Code size={14} /> Code
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/90 text-black shadow-sm">
            {project.category}
          </span>
        </div>
      </div>
      
      {/* Project info visible by default */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-auto">
          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{project.description}</p>
        </div>
        
        {/* Tech stack */}
        <div className="mt-3">
          <div className="flex items-center gap-1.5 mb-2 text-gray-700">
            <Layers size={16} className="opacity-70" />
            <span className="text-xs font-semibold">Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span key={idx} className="bg-gray-100 px-2.5 py-1 rounded-full text-xs text-gray-700 flex items-center gap-1">
                <Tag size={10} strokeWidth={3} />
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs text-gray-700">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>
        
        {/* View project link */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 flex items-center gap-1 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            View Project <ArrowUpRight size={14} />
          </a>
          
          {/* Featured badge - show if project is featured */}
          {project.featured && (
            <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2.5 py-0.5 font-medium">
              Featured
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Project Modal with Image Gallery
const ProjectModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.gallery || [project.image];
  
  // Navigate through images
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white dark:bg-zinc-900 w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
            {/* Image Gallery */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} className="text-white" />
                  </button>
                </>
              )}
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                />
              </AnimatePresence>
              
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60" />
              
              {/* Image pagination indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">{project.title}</h2>
                
                {/* Project links */}
                <div className="flex gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    <ExternalLink size={16} /> Visit Site
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
                    >
                      <Code size={16} /> View Code
                    </a>
                  )}
                </div>
              </div>

              {/* Project description */}
              <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
                {project.fullDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: project.fullDescription }} />
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
              
              {/* Tech stack */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-sm font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Key features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Project completion date */}
              {project.completedDate && (
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Completed: {project.completedDate}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AceternityProjectShowcase;