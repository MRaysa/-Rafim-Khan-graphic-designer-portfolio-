import React, { useState, useEffect } from 'react';
import { galleryData } from '../../data/galleryData';
import GalleryGrid from './GalleryGrid';
import GalleryFilters from './GalleryFilters';
import Lightbox from './Lightbox';
import LoadingSpinner from '../ui/LoadingSpinner';

const GallerySection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadImages = () => {
      setLoading(true);
      try {
        // Load images from localStorage
        const storedImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
        // Combine with default gallery data
        const allImages = [...galleryData, ...storedImages];
        setImages(allImages);
      } catch (error) {
        console.error('Error loading images:', error);
        setImages(galleryData);
      }
      setLoading(false);
    };

    loadImages();
  }, []);
  
  const tags = ['all', 'branding', 'print', 'web', 'photography', 'illustration'];
  
  const filteredImages = selectedTag === 'all'
    ? images
    : images.filter(image => image.tags.includes(selectedTag));
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Gallery</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of my design work, photography, and creative explorations.
          </p>
        </div>
        
        <GalleryFilters 
          tags={tags} 
          selectedTag={selectedTag} 
          onTagSelect={setSelectedTag} 
        />
        
        <GalleryGrid 
          images={filteredImages}
          onImageClick={setSelectedImage} 
        />
      </div>
      
      {selectedImage && (
        <Lightbox 
          image={selectedImage}
          images={filteredImages}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default GallerySection;