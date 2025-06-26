"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { AnimatedText } from '../../ui/animated-text'

const faqs = [
  {
    question: "📬 How can I reach out to you for collaborations or work opportunities?",
    answer: "You can reach out via the contact form on this website or email me directly at h30s.soni@gmail.com. I usually respond within 24–48 hours. Let’s bring your idea to life!"
  },
  {
    question: "🛠️ What services do you offer as a freelancer?",
    answer: "I specialize in full-stack web development (React, Next.js, Node.js), UI/UX design, SEO optimization, mobile-responsive interfaces, and building fast, scalable web apps. Whether it's an MVP, portfolio, or product platform — I’ve got you covered."
  },
  {
    question: "⏱️ How long does it take to complete a project?",
    answer: "Timelines vary based on complexity. A simple landing page might take 1–2 weeks, while full-scale applications can span 4–8 weeks. I’ll always provide a clear timeline tailored to your goals before we begin."
  },
  {
    question: "🚀 What is your approach to freelancing projects?",
    answer: "I focus on clarity, creativity, and communication. I start by understanding your vision, then wireframe, prototype, build, and iterate with your feedback. The goal: clean, performant, and user-centric solutions you’re proud to launch."
  },
  {
    question: "🔧 Do you provide post-project support?",
    answer: "Yes — every build comes with optional post-launch support. Whether it's fixing bugs, adding features, or future-proofing your app, I’ll be there. We can also set up ongoing maintenance based on your needs."
  }
]


export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-40 right-10 w-64 h-64 rounded-full bg-gray-100 opacity-60 mix-blend-multiply blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 left-10 w-72 h-72 rounded-full bg-yellow-100 opacity-60 mix-blend-multiply blur-3xl"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span 
            className="block mb-3 text-sm font-medium tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            QUESTIONS & ANSWERS
          </motion.span>
          <AnimatedText 
            text="Frequently Asked Questions"
            className="text-3xl md:text-5xl font-bold"
            once={true}
            delay={0.1}
          />
        </div>
        
        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-b border-gray-200 last:border-b-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-6 focus:outline-none relative"
                aria-expanded={openIndex === index}
              >
                <div className="flex justify-between items-center">
                  <motion.h3 
                    className={`text-xl font-medium transition-colors ${hoveredIndex === index ? 'text-black' : 'text-gray-700'}`}
                    animate={{ 
                      x: hoveredIndex === index ? 4 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {faq.question}
                  </motion.h3>
                  <motion.div
                    animate={{ 
                      rotate: openIndex === index ? 180 : 0,
                      backgroundColor: hoveredIndex === index ? '#000000' : '#f3f4f6',
                      color: hoveredIndex === index ? '#ffffff' : '#6b7280',
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-2 p-1 rounded-full"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
                
                {/* Subtle hover indicator */}
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] bg-black"
                  initial={{ width: '0%' }}
                  animate={{ width: hoveredIndex === index && openIndex !== index ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <motion.p 
                      className="pb-6 text-gray-600"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Final CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="mb-6 text-gray-600">
            Still have questions? Feel free to reach out directly.
          </p>
          <motion.a 
            href="#contact"
            className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            Contact me
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}