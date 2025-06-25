import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { ParticleBackground } from './particle-background'
import { AnimatedText } from './animated-text'

export default function HeroSection() {
    // Google Drive resume link
    const resumeUrl = "https://github.com/h30s"

    // Function to handle resume download
    const handleResumeDownload = () => {
        // Convert the Google Drive link to an export link that forces download
        const exportUrl = resumeUrl.replace('/edit?usp=sharing', '/export?format=pdf')
        window.open(exportUrl, '_blank')
    }

    return (
        <section id="home" className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
            {/* Particle background */}
            <ParticleBackground quantity={30} staticity={20} ease={50} color="#000000" className="opacity-70 z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    {/* Left column - Text content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="text-sm font-medium tracking-wider bg-black text-white px-4 py-1.5 rounded-full">
                                🚀 Full-Stack Developer
                            </span>
                        </motion.div>

                        <AnimatedText
                            text="Building cool stuff with code"
                            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                            once={true}
                            duration={0.08}
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-600 text-lg md:text-xl mb-10 max-w-lg"
                        >
                            I craft sleek, AI-powered apps that look good and work smarter. Design + dev = my playground


                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-black text-white rounded-full font-medium flex items-center justify-center gap-2 group shadow-sm hover:shadow-md transition-shadow"
                            >
                                View my work
                                <motion.span
                                    initial={{ x: 0 }}
                                    animate={{ x: 3 }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        duration: 0.6
                                    }}
                                >
                                    <ArrowRight size={18} />
                                </motion.span>
                            </motion.a>

                            <motion.button
                                onClick={handleResumeDownload}
                                whileHover={{ scale: 1.03, backgroundColor: "#000000", color: "#ffffff" }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                className="px-8 py-4 border-2 border-black text-black rounded-full font-medium flex items-center justify-center gap-2 hover:gap-3 transition-all"
                            >
                                Download Resume
                                <Download size={18} />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right column - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            delay: 0.4
                        }}
                        className="relative aspect-square rounded-3xl overflow-hidden shadow-lg"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent z-10"></div>
                        <motion.div
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="w-full h-full"
                        >
                            <img
                                src="https://avatars.githubusercontent.com/u/183348352?v=4"
                                alt="Himanshu Soni"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <span className="text-white/90 text-sm uppercase tracking-wider font-medium">Available for work</span>
                                <h3 className="text-white text-xl font-semibold">Cool project? I’m in. Let’s chat ☕

                                </h3>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scrolling ticker at bottom */}
            <div className="mt-24 md:mt-32 overflow-hidden border-t border-b border-gray-200 py-6 relative z-10">
                <div className="overflow-hidden relative w-full">
                    <motion.div
                        className="flex gap-8 whitespace-nowrap"
                        animate={{
                            x: [0, "-50%"]
                        }}
                        transition={{
                            x: {
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                                repeatType: "loop"
                            }
                        }}
                    >
                        {[
                            '🟨 JavaScript',
                            '🟦 TypeScript',
                            '⚛️ React.js',
                            '⚡ Next.js',
                            '🌐 Node.js',
                            '🧠 Express.js',
                            '🐘 PostgreSQL',
                            '🍃 MongoDB',
                            '🔥 Firebase',
                            '🔧 REST APIs',
                            '🎨 UI/UX Design',
                            '🧩 Tailwind CSS',
                            '🖼️ Framer Motion',
                            '🧪 Jest & Testing Library',
                            '🛠️ Git & GitHub',
                            '☁️ Vercel & Netlify',
                            '💻 Responsive Design',
                            '🔒 Authentication (JWT, OAuth)',
                            '📦 NPM & Yarn',
                            '🧠 Clean Code & Best Practices'
                        ].map((skill, index) => (
                            <span key={index} className="text-lg font-medium whitespace-nowrap">
                                {skill} <span className="text-gray-300 mx-2">•</span>
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}