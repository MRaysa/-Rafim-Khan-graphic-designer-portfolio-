import React from 'react';
import AboutSection from '../components/about/AboutSection';
import SkillsSection from '../components/skills/SkillsSection';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24">
      <AboutSection />
      <SkillsSection />
    </div>
  );
};

export default AboutPage;