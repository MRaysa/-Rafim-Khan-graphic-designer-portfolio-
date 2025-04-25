import React from 'react';

interface GalleryFiltersProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

const GalleryFilters: React.FC<GalleryFiltersProps> = ({ 
  tags, 
  selectedTag, 
  onTagSelect 
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {tags.map((tag, index) => (
        <button 
          key={index}
          onClick={() => onTagSelect(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedTag === tag
              ? 'bg-pink-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {tag.charAt(0).toUpperCase() + tag.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default GalleryFilters;