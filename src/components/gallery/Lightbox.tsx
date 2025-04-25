import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface LightboxProps {
  image: GalleryImage;
  images: GalleryImage[];
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ image, images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Find the index of the selected image
    const index = images.findIndex(img => img.id === image.id);
    setCurrentIndex(index >= 0 ? index : 0);
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        navigatePrev();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, images, onClose]);
  
  const navigateNext = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const navigatePrev = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const currentImage = images[currentIndex];
  
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>
      
      <button
        onClick={navigatePrev}
        className="absolute left-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={navigateNext}
        className="absolute right-4 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="w-full max-w-4xl">
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-gray-600 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
          )}
          
          <img 
            src={currentImage.url} 
            alt={currentImage.title}
            className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            onLoad={() => setIsLoading(false)}
          />
        </div>
        
        <div className="bg-gray-900 p-4 rounded-b-lg mt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{currentImage.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{currentImage.description}</p>
              
              <div className="flex flex-wrap mt-2 gap-2">
                {currentImage.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-block px-2 py-1 text-xs rounded-full bg-pink-500/20 text-pink-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {currentImage.downloadable && (
              <a 
                href={currentImage.url} 
                download
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Download image"
              >
                <Download size={20} />
              </a>
            )}
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsLoading(true);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-pink-500' : 'bg-gray-600'
                }`}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;