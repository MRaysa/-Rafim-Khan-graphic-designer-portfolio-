import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose} size="full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-sm mb-4">
              {project.category}
            </span>
            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
            <p className="text-gray-300">{project.shortDescription}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Project Overview</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-sm text-gray-400 mb-1">Client</h4>
                <p className="font-medium">{project.client}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-400 mb-1">Year</h4>
                <p className="font-medium">{project.year}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-400 mb-1">Duration</h4>
                <p className="font-medium">{project.duration}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-400 mb-1">Role</h4>
                <p className="font-medium">{project.role}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
            <p className="text-gray-300">{project.challenge}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">The Solution</h3>
            <p className="text-gray-300">{project.solution}</p>
          </div>
          
          {project.link && (
            <div className="mt-6">
              <Button 
                href={project.link} 
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowRight />}
                iconPosition="right"
              >
                Visit Project
              </Button>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={project.coverImage} 
              alt={project.title}
              className="w-full h-auto"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {project.images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`${project.title} - ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
          
          {project.process && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Design Process</h3>
              <ul className="space-y-3">
                {project.process.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="text-pink-500 mt-1 mr-2 flex-shrink-0" size={18} />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProjectDetail;