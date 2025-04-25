import React, { useEffect, useRef } from 'react';

interface SkillGraphProps {
  skill: {
    name: string;
    value: number;
  };
}

const SkillGraph: React.FC<SkillGraphProps> = ({ skill }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chart.style.setProperty('--progress', `${skill.value}`);
            chart.classList.add('animate-progress');
            observer.unobserve(chart);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    observer.observe(chart);
    
    return () => {
      observer.disconnect();
    };
  }, [skill.value]);
  
  return (
    <div className="text-center">
      <div 
        ref={chartRef}
        className="relative w-32 h-32 mx-auto mb-4"
        style={{ '--progress': '0' } as React.CSSProperties}
      >
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#1f2937"
            strokeWidth="10"
          />
          
          {/* Progress circle with gradient */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset="calc(283 - (283 * var(--progress)) / 100)"
            transform="rotate(-90 50 50)"
            className="transition-all duration-1500 ease-out"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{skill.value}%</span>
        </div>
      </div>
      
      <h4 className="font-medium">{skill.name}</h4>
    </div>
  );
};

export default SkillGraph;