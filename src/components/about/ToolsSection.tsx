import React from 'react';

const tools = [
  {
    name: 'Adobe Photoshop',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/2101px-Adobe_Photoshop_CC_icon.svg.png',
    category: 'software',
    proficiency: 95
  },
  {
    name: 'Adobe Illustrator',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/2101px-Adobe_Illustrator_CC_icon.svg.png',
    category: 'software',
    proficiency: 90
  },
  {
    name: 'Figma',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
    category: 'software',
    proficiency: 98
  },
  {
    name: 'After Effects',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/2101px-Adobe_After_Effects_CC_icon.svg.png',
    category: 'software',
    proficiency: 85
  },
  {
    name: 'Blender',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2503px-Blender_logo_no_text.svg.png',
    category: 'software',
    proficiency: 75
  },
  {
    name: 'Cinema 4D',
    icon: 'https://upload.wikimedia.org/wikipedia/en/d/d8/C4D_Logo.png',
    category: 'software',
    proficiency: 70
  },
  {
    name: 'Wacom Tablet',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Wacom_logo.svg/2560px-Wacom_logo.svg.png',
    category: 'hardware',
    proficiency: 95
  },
  {
    name: 'iPad Pro',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
    category: 'hardware',
    proficiency: 90
  }
];

const ToolsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {tools.map((tool, index) => (
        <div 
          key={index}
          className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors"
        >
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <img 
              src={tool.icon} 
              alt={tool.name}
              className="max-w-full max-h-full object-contain" 
            />
          </div>
          
          <h3 className="font-semibold mb-2">{tool.name}</h3>
          
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
            <div 
              className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-pink-500" 
              style={{ width: `${tool.proficiency}%` }}
            ></div>
          </div>
          
          <span className="text-sm text-gray-400">
            Proficiency: {tool.proficiency}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default ToolsSection;