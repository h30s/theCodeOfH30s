import React, { useState, useEffect } from "react";
import HeroSection from "../components/Hero/HeroSection";
import AboutSection from "../components/About/AboutSection";
import ProjectsSection from "../components/Projects/ProjectsSection"
import ContactSection from "../components/Contact/ContactSection";
import Faq from "../components/Faq/Faq";
import Footer from "../components/Footer/Footer";
import Header from "../components/Navbar/Header";
import { FlowingGradient } from "../ui/flowing-gradient";
import { AnimatedShapesBackground } from "../ui/animated-shapes-background";
import { GridAnimation } from "../ui/grid-animation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check if window is defined (for SSR)
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      // Simulate loading time
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Global animated backgrounds with improved visibility */}
      <div className="fixed inset-0 z-[-3]" style={{ pointerEvents: "none" }}>
        {/* Primary background with flowing gradients */}
        <FlowingGradient
          colorScheme="blue"
          intensity="high"
          blur="medium"
          className="opacity-50"
        />
      </div>

      {/* Global animated shapes background that will appear throughout the page */}
      <div className="fixed inset-0 z-[-2]" style={{ pointerEvents: "none" }}>
        <AnimatedShapesBackground
          variant="mixed"
          intensity="high"
          baseColor="#6366f1"
          accentColor="#8b5cf6"
          tertiaryColor="#10b981"
          className="opacity-40"
        />
      </div>

      {/* Additional background grid for texture */}
      <div className="fixed inset-0 z-[-1]" style={{ pointerEvents: "none" }}>
        <GridAnimation
          variant="wave"
          cellSize={50}
          opacity={0.07}
          color="#000000"
          animationSpeed={15}
          className="opacity-80"
        />
      </div>

      <Header isMobile={isMobile} />

      {/* Main Content */}
      <main>
        <section id="home" className="relative">
          <HeroSection />
        </section>

        <section id="about" className="relative">
          <AboutSection />
        </section>

        <section id="projects" className="relative">
          <ProjectsSection />
        </section>
        
        <section id="faq" className="relative">
          <Faq />
        </section>

        <section id="contact" className="relative">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}