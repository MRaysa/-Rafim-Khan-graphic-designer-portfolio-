import React, { useEffect, useRef } from 'react';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Masonry-style layout with CSS (no external libraries)
    const resizeObserver = new ResizeObserver(() => {
      if (!gridRef.current) return;
      
      const gridItems = gridRef.current.querySelectorAll('.gallery-item');
      const columnCount = window.innerWidth < 640 ? 1 : 
                          window.innerWidth < 768 ? 2 : 
                          window.innerWidth < 1024 ? 3 : 4;
      
      // Reset positions
      gridItems.forEach((item) => {
        (item as HTMLElement).style.removeProperty('margin-top');
      });
      
      if (columnCount <= 1) return;
      
      // Calculate and set positions
      const items = Array.from(gridItems);
      const itemWidth = items[0].getBoundingClientRect().width;
      const gap = 16; // Matches the gap in the grid
      
      for (let i = columnCount; i < items.length; i++) {
        const currentItem = items[i] as HTMLElement;
        const itemAbove = items[i - columnCount] as HTMLElement;
        const itemAboveHeight = itemAbove.getBoundingClientRect().height;
        const itemAboveBottom = itemAbove.offsetTop + itemAboveHeight;
        
        currentItem.style.marginTop = `-${(currentItem.offsetTop - itemAboveBottom - gap)}px`;
      }
    });
    
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [images]);
  
  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {images.map((image, index) => (
        <div 
          key={index}
          className="gallery-item rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => onImageClick(image)}
        >
          <div className="relative">
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4">
                <h3 className="text-white font-medium">{image.title}</h3>
                <div className="flex flex-wrap mt-2 gap-2">
                  {image.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="inline-block px-2 py-1 text-xs rounded-full bg-pink-500/20 text-pink-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;