import React from 'react';
import Hero from '../components/home/Hero';
import ProjectsSection from '../components/projects/ProjectsSection';
import AboutSection from '../components/about/AboutSection';
import SkillsSection from '../components/skills/SkillsSection';
import TestimonialsSection from '../components/testimonials/TestimonialsSection';
import ContactSection from '../components/contact/ContactSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;