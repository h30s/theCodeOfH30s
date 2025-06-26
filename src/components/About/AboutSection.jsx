import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '../../ui/animated-text'
import { AnimatedGridBackground } from '../../ui/animated-grid-background'


export default function AboutSection() {
  const skills = [
  {
    category: '💻 Development',
    items: [
      '🟨 JavaScript',
      '🟦 TypeScript',
      '⚛️ React.js',
      '⚡ Next.js',
      '🌐 Node.js',
      '🧠 Express.js',
      '🍃 MongoDB',
    ]
  },
  {
    category: '🎨 Design',
    items: [
      '🎨 UI/UX Design',
      '🖼️ Framer Motion',
      '💻 Responsive Design'
    ]
  },
  {
    category: '🔥 Tools & DevOps',
    items: [
      '🛠️ Git & GitHub',
      '☁️ Vercel & Netlify',
      '🔒 Authentication (JWT, OAuth)',
      '🧠 Clean Code & Best Practices'
    ]
  }
];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  }

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated grid background */}
      <AnimatedGridBackground 
        gridSize={60}
        blur={30}
        speed={0.5}
        containerClassName="absolute inset-0 z-0"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <motion.span 
            className="block mb-3 text-sm font-medium tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ABOUT ME
          </motion.span>
          <AnimatedText 
            text="My background"
            className="text-3xl md:text-5xl font-bold"
            once={true}
            delay={0.1}
          />
        </div>

        {/* About content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left column - Bio */}
          <div className="pr-0 md:pr-6">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl leading-relaxed">
                Hey there! I’m a creative coder 🎨💻, a design lover turned full-stack dev 🚀 — building clean, powerful, and scroll-stopping digital experiences.
              </p>
              
              <p className="text-gray-600">
                Started out vibin’ with UI design, leveled up into frontend ninja moves ⚡, and now I’m rocking full-stack magic. I don’t just build pretty things — I build smart, fast, and user-first solutions that actually make life easier.
              </p>
              
              <p className="text-gray-600">
                From pixels to performance, I’m all about crafting web apps that hit different — smooth, accessible, and made with purpose.
              </p>
              
              <div className="pt-6">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-black font-medium flex items-center gap-2 group relative overflow-hidden"
                >
                  <motion.span 
                    className="inline-block w-8 h-[2px] bg-black group-hover:w-12 transition-all duration-300 relative z-10"
                  ></motion.span>
                  <span className="relative z-10">🚀 See what I’ve been building lately

</span>
                  
                  <motion.span
                    className="absolute bottom-0 left-0 h-[2px] bg-black"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Skills */}
          <div>
            <motion.div
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm backdrop-blur-sm relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-8">Skills & Expertise</h3>
              
              <div className="space-y-8">
                {skills.map((skillGroup, index) => (
                  <div key={index}>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          custom={skillIndex}
                          variants={fadeInUpVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm hover:bg-black hover:text-white hover:border-black transition-colors duration-300 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Decorative element */}
              <motion.div 
                className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full mix-blend-multiply blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.4, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}