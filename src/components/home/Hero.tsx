import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import AnimatedText from '../ui/AnimatedText';
import Hero3D from './Hero3D';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const headline = heroRef.current.querySelector('.hero-headline');
      const cta = heroRef.current.querySelector('.hero-cta');
      
      if (headline) {
        (headline as HTMLElement).style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
      
      if (cta) {
        (cta as HTMLElement).style.transform = `translate(${x * -10}px, ${y * -10}px)`;
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <Hero3D />
      
      <div className="container mx-auto px-4 md:px-6 z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-headline transition-transform duration-500 ease-out"
        >
          <AnimatedText 
            text="Designing Emotions," 
            tag="h1" 
            animation="fade-in"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500"
          />
          <AnimatedText 
            text="Pixel by Pixel" 
            tag="h1" 
            animation="fade-in"
            delay={400}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            I craft visually stunning designs that connect with your audience and elevate your brand.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="hero-cta transition-transform duration-500 ease-out"
        >
          <Button 
            href="/projects" 
            size="lg" 
            icon={<ArrowRight />}
            iconPosition="right"
            className="group"
          >
            View My Work
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
              →
            </span>
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <div className="animate-bounce">
          <div className="w-0.5 h-12 bg-gradient-to-b from-white/0 to-white/70 mx-auto"></div>
          <p className="text-sm font-light mt-2">Scroll to explore</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;