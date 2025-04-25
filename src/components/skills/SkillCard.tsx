import React, { useEffect, useRef } from 'react';

interface SkillCardProps {
  skill: {
    name: string;
    value: number;
    icon: string;
  };
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const barRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              bar.style.width = `${skill.value}%`;
              bar.classList.add('opacity-100');
            }, index * 200);
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    observer.observe(bar);
    
    return () => {
      observer.disconnect();
    };
  }, [skill.value, index]);
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">{skill.icon}</span>
        <h4 className="font-semibold text-lg">{skill.name}</h4>
      </div>
      
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-blue-400 uppercase">
            {skill.value < 80 ? 'Advanced' : skill.value < 90 ? 'Expert' : 'Master'}
          </div>
          <div className="text-xs font-semibold text-pink-400">
            {skill.value}%
          </div>
        </div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            ref={barRef}
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 w-0 opacity-0 transition-all duration-1000 ease-out"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;