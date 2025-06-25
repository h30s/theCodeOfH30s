import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Navbar/Header';
import HeroSection from './components/Hero/HeroSection';
import { AnimatedGridBackground } from './ui/animated-grid-background';
import { AnimatedShapesBackground } from './ui/animated-shapes-background';
import { FlowingGradient } from './ui/flowing-gradient';
import { GlowingInput } from './ui/glowing-input';
import { GridAnimation } from './ui/grid-animation';
import Footer from './components/Footer/Footer';
import Loader from './components/loader/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <HeroSection />
          <AnimatedGridBackground />
          <AnimatedShapesBackground />
          <FlowingGradient />
          <GlowingInput />
          <GridAnimation />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
