import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-pink-500/50 transition-colors shadow-xl">
      <Quote className="text-pink-500 mb-4" size={32} />
      
      <p className="text-gray-300 italic mb-6">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="h-full w-full object-cover"
          />
        </div>
        
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.position}, {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;