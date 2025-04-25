import React from 'react';
import SkillGraph from './SkillGraph';
import SkillCard from './SkillCard';

const technicalSkills = [
  { name: 'Branding', value: 95 },
  { name: 'UI/UX Design', value: 90 },
  { name: 'Print Design', value: 85 },
  { name: 'Typography', value: 92 },
  { name: '3D Design', value: 75 },
  { name: 'Motion Graphics', value: 80 },
];

const softSkills = [
  { name: 'Communication', value: 90, icon: '💬' },
  { name: 'Creativity', value: 95, icon: '🎨' },
  { name: 'Problem Solving', value: 85, icon: '🧩' },
  { name: 'Time Management', value: 80, icon: '⏱️' },
];

const SkillsSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My professional toolkit and areas of expertise in the design field.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Technical Skills</h3>
            <div className="grid grid-cols-2 gap-8">
              {technicalSkills.map((skill, index) => (
                <SkillGraph key={index} skill={skill} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Soft Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {softSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-24">
          <h3 className="text-2xl font-bold mb-8 text-center">Design Process</h3>
          <div className="flex flex-col md:flex-row justify-between max-w-4xl mx-auto">
            {['Discover', 'Define', 'Design', 'Develop', 'Deliver'].map((step, index) => (
              <div key={index} className="text-center mb-8 md:mb-0">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto border-2 border-pink-500 mb-4">
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-pink-500 to-blue-500"></div>
                  )}
                </div>
                
                <h4 className="font-semibold text-lg mb-2">{step}</h4>
                <p className="text-gray-400 text-sm">
                  {index === 0 && 'Research & understand the problem'}
                  {index === 1 && 'Analyze findings & set goals'}
                  {index === 2 && 'Ideate & create solutions'}
                  {index === 3 && 'Refine & improve designs'}
                  {index === 4 && 'Finalize & implement'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;