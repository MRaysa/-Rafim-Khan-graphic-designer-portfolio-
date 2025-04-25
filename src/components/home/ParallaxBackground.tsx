import React, { useEffect, useRef } from 'react';

const ParallaxBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const shapes = containerRef.current.querySelectorAll('.shape');
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current?.getBoundingClientRect() || { width: 0, height: 0 };
      
      const xPos = (clientX / width - 0.5) * 2; // -1 to 1
      const yPos = (clientY / height - 0.5) * 2; // -1 to 1
      
      shapes.forEach((shape, index) => {
        const speed = 1 - (index % 3) * 0.2;
        const xOffset = xPos * 50 * speed;
        const yOffset = yPos * 50 * speed;
        (shape as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxAmount = scrollY * 0.4;
      
      containerRef.current?.style.setProperty('--parallax-y', `${parallaxAmount}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        transform: 'translateY(var(--parallax-y, 0))',
      }}
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gray-900 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-gray-900 to-pink-900/30"></div>
      
      {/* Abstract shapes */}
      <div className="shape absolute top-[10%] right-[15%] w-64 h-64 rounded-full bg-blue-500/20 blur-[60px] transition-transform duration-700 ease-out"></div>
      <div className="shape absolute top-[30%] left-[10%] w-72 h-72 rounded-full bg-pink-500/20 blur-[80px] transition-transform duration-700 ease-out"></div>
      <div className="shape absolute bottom-[20%] right-[30%] w-48 h-48 rounded-full bg-purple-500/20 blur-[60px] transition-transform duration-700 ease-out"></div>
      <div className="shape absolute bottom-[5%] left-[35%] w-56 h-56 rounded-full bg-blue-400/20 blur-[70px] transition-transform duration-700 ease-out"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMzMzIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
    </div>
  );
};

export default ParallaxBackground;