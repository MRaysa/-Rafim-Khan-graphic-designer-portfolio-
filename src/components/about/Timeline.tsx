import React from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const timelineData = [
  {
    year: '2022',
    title: 'Senior Designer at Creative Flux',
    description: 'Led design projects for major clients, mentored junior designers, and contributed to agency growth.',
    icon: <Briefcase size={20} className="text-pink-500" />,
    type: 'work'
  },
  {
    year: '2020',
    title: 'Design Lead at TechVision',
    description: 'Spearheaded UI/UX design for enterprise software products and established design system.',
    icon: <Briefcase size={20} className="text-pink-500" />,
    type: 'work'
  },
  {
    year: '2019',
    title: 'Design Excellence Award',
    description: 'Recognized for outstanding contribution to the field of interactive design.',
    icon: <Award size={20} className="text-yellow-500" />,
    type: 'award'
  },
  {
    year: '2018',
    title: 'UI/UX Designer at InnovateLab',
    description: 'Created user interfaces for startups and established brands in the tech industry.',
    icon: <Briefcase size={20} className="text-pink-500" />,
    type: 'work'
  },
  {
    year: '2017',
    title: 'Master of Design, Visual Communication',
    description: 'Graduated with distinction, specializing in interactive design and brand identity.',
    icon: <GraduationCap size={20} className="text-blue-500" />,
    type: 'education'
  },
  {
    year: '2015',
    title: 'Junior Designer at DesignWorks',
    description: 'Started professional career working on print and digital design projects.',
    icon: <Briefcase size={20} className="text-pink-500" />,
    type: 'work'
  },
];

const Timeline: React.FC = () => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-pink-500 via-blue-500 to-purple-500"></div>
      
      <div className="relative">
        {timelineData.map((item, index) => (
          <div 
            key={index}
            className={`mb-12 md:mb-0 flex flex-col md:flex-row ${
              index % 2 === 0 
                ? 'md:flex-row-reverse' 
                : ''
            }`}
          >
            <div className="md:w-1/2 pb-12">
              <div 
                className={`${
                  index % 2 === 0 
                    ? 'md:ml-12' 
                    : 'md:mr-12'
                } p-6 bg-gray-800 rounded-lg shadow-lg`}
              >
                <div className="flex items-center mb-3">
                  {item.icon}
                  <span className="ml-2 text-sm font-semibold px-2 py-1 rounded-full bg-gray-700">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              {/* Timeline dot */}
              <div className="absolute top-6 left-0 md:left-auto md:right-0 md:translate-x-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gray-800 border-2 border-blue-500 z-10"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;