import React from 'react';
import { testimonialsData } from '../../data/testimonialsData';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            What clients say about working with me.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;