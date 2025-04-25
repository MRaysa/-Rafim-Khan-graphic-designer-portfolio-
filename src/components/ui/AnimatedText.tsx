import React, { useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  animation?: 'typewriter' | 'fade-in' | 'slide-up' | 'highlight';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  speed = 40,
  tag = 'h1',
  animation = 'typewriter'
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<string>('');
  const indexRef = useRef<number>(0);
  
  useEffect(() => {
    const animateTypewriter = () => {
      if (!elementRef.current) return;
      
      const animationTimeout = setTimeout(() => {
        if (indexRef.current < text.length) {
          textRef.current += text.charAt(indexRef.current);
          if (elementRef.current) {
            elementRef.current.innerText = textRef.current;
          }
          indexRef.current += 1;
          requestAnimationFrame(animateTypewriter);
        }
      }, speed);
      
      return () => clearTimeout(animationTimeout);
    };
    
    const delayTimeout = setTimeout(() => {
      if (animation === 'typewriter') {
        textRef.current = '';
        indexRef.current = 0;
        requestAnimationFrame(animateTypewriter);
      }
    }, delay);
    
    return () => clearTimeout(delayTimeout);
  }, [text, delay, speed, animation]);
  
  const baseClass = className;
  
  const animationClasses = {
    'typewriter': '',
    'fade-in': 'animate-fadeIn',
    'slide-up': 'animate-slideUpIn',
    'highlight': 'animate-highlight'
  };
  
  const combinedClasses = `${baseClass} ${animationClasses[animation]}`;
  
  const TagName = tag as keyof JSX.IntrinsicElements;
  
  return (
    <TagName 
      ref={elementRef as React.RefObject<HTMLDivElement>} 
      className={combinedClasses}
    >
      {animation !== 'typewriter' ? text : ''}
    </TagName>
  );
};

export default AnimatedText;