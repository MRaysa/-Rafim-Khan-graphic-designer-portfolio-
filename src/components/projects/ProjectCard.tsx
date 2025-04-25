import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      className="group relative rounded-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-w-4 aspect-h-3">
        <img 
          src={project.coverImage} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent p-6 flex flex-col justify-end transform transition-opacity duration-300">
        <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center mb-2">
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-pink-500/20 text-pink-400 mr-2">
              {project.category}
            </span>
            <span className="text-gray-400 text-sm">{project.year}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 group-hover:text-pink-500 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {project.shortDescription}
          </p>
          
          <div className="flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="mr-1">View Project</span>
            <ExternalLink size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;