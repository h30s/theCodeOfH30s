import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ progress }) => {
  // Handle progress percentage (0-100) if provided, or show indeterminate loading
  const hasProgress = typeof progress === 'number';
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-5xl font-bold">
          <span>h30s</span>
          <span className="text-gray-400">.dev</span>
        </h1>
      </motion.div>
      
      {hasProgress ? (
        <motion.div 
          className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="h-full bg-black rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ) : (
        <motion.div
          className="flex space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-black rounded-full"
              animate={{
                y: ['0%', '-100%', '0%'],
                opacity: [1, 0.5, 1],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.15,
              }}
            />
          ))}
        </motion.div>
      )}
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6 text-sm text-gray-500"
      >
        {hasProgress 
          ? `npm start --loading ${Math.round(progress)}%` 
          : 'Just a sec... brewing some code ☕'}
      </motion.p>
    </div>
  );
};

export default Loader;