import React, { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Github, Twitter, ArrowUpRight } from 'lucide-react'


export default function Footer() {
  const socialLinks = [
    { 
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/h30s/',
      icon: <Linkedin className="w-5 h-5" />
    },
    { 
      name: 'GitHub',
      url: 'https://github.com/h30s',
      icon: <Github className="w-5 h-5" />
    },
     {
      name: 'X',
      url: 'https://x.com/SoniH30s', 
      icon: <Twitter className="w-5 h-5" />
    }
  ];

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'FAQs', href: '#faq' },
  ];
  
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-6">h30s<span className="text-gray-400">.dev</span></h2>
            <p className="text-gray-400 mb-6 max-w-xs">
              Delivering high-quality digital products, meaningful brands, and engaging user experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
          </div>
          
          {/* Column 2 - Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3 - Contact with Glassmorphism */}
          <div className="lg:col-span-2 relative">
            <div className="glassmorphism-card p-8 rounded-2xl relative z-10 overflow-hidden">
              {/* Glassmorphism inner glow effects */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              <h3 className="text-xl font-semibold mb-6">Ready to Build Something Great? 🔥</h3>
              <p className="text-gray-300 mb-6">
                If you’ve got a vision, I’ve got the skills to bring it to life. Let’s talk!
              </p>
              <a 
                href="mailto:h30s.soni@gmail.com"
                className="inline-flex items-center gap-2 font-medium group mb-8"
              >
                h30s.soni@gmail.com
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <ArrowUpRight size={16} />
                </span>
              </a>
              
              <div className="mt-6">
                <button 
                  onClick={handleScrollTop}
                  className="bg-white/10 border border-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors"
                >
                  Back to top
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            <p>© {currentYear} Himanshu Soni. All rights reserved.</p>
          </div>
          <div className="text-gray-500 text-sm">
            A developer’s heart, a Bulandshahr soul. ❤️
          </div>
        </div>
      </div>
    </footer>
  )
}