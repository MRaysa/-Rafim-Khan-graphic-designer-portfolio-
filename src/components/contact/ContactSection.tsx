import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss a collaboration? I'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <p className="text-gray-300 mb-8">
              Feel free to reach out for collaborations, project inquiries, or just to say hello. I'm always open to discussing new projects and creative ideas.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-gray-800 rounded-lg mr-4">
                  <Mail className="text-pink-500" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-gray-400">hello@rafimkhan.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-gray-800 rounded-lg mr-4">
                  <Phone className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-gray-800 rounded-lg mr-4">
                  <MapPin className="text-purple-500" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-gray-400">New York, NY, USA</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden h-64">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1663364878134!5m2!1sen!2sca" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of New York"
              ></iframe>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Send className="text-pink-500 mr-2" size={20} />
                Send a Message
              </h3>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;