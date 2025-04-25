import React, { useState, useEffect } from 'react';
import { galleryData } from '../../data/galleryData';
import { Edit, Trash2, Search, Filter } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import LoadingSpinner from '../ui/LoadingSpinner';

const GalleryManager: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    downloadable: false
  });

  useEffect(() => {
    const loadImages = () => {
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
  
  // Get all unique tags from images
  const allTags = ['all', ...new Set(images.flatMap(image => image.tags))];
  
  // Filter images by search query and tag
  const filteredImages = images.filter(image => {
    const matchesSearch = searchQuery === '' || 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = filterTag === 'all' || image.tags.includes(filterTag);
    
    return matchesSearch && matchesTag;
  });
  
  const handleEditClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setEditForm({
      title: image.title,
      description: image.description,
      tags: image.tags,
      downloadable: image.downloadable
    });
    setIsEditModalOpen(true);
  };
  
  const handleDeleteClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsDeleteModalOpen(true);
  };
  
  const handleDelete = () => {
    if (!selectedImage) return;
    
    const updatedImages = images.filter(img => img.id !== selectedImage.id);
    setImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    setIsDeleteModalOpen(false);
    setSelectedImage(null);
  };
  
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    setEditForm(prev => ({ ...prev, tags }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditForm(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) return;
    
    const updatedImages = images.map(img => 
      img.id === selectedImage.id
        ? { ...img, ...editForm }
        : img
    );
    
    setImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    setIsEditModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
          />
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors appearance-none"
          >
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-400">
          Showing {filteredImages.length} of {images.length} images
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Image</th>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Tags</th>
              <th className="px-4 py-3 font-semibold">Downloadable</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredImages.map((image) => (
              <tr key={image.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-700">
                    <img 
                      src={image.url} 
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{image.title}</p>
                    <p className="text-sm text-gray-400 truncate max-w-xs">
                      {image.description}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {image.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="inline-block px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {image.downloadable ? (
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">
                      No
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(image)}
                      className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                      aria-label="Edit image"
                    >
                      <Edit size={16} className="text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(image)}
                      className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                      aria-label="Delete image"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredImages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No images found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Edit Modal */}
      {selectedImage && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Image"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <div className="rounded-md overflow-hidden mb-4">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors resize-none"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="tags" className="block text-sm font-medium mb-2">
                  Tags (comma separated)
                </label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={editForm.tags.join(', ')}
                  onChange={handleTagChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    id="downloadable"
                    name="downloadable"
                    type="checkbox"
                    checked={editForm.downloadable}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-600 text-pink-500 focus:ring-pink-500"
                  />
                  <label htmlFor="downloadable" className="ml-2 block text-sm">
                    Allow visitors to download this image
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
      
      {/* Delete Confirmation Modal */}
      {selectedImage && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Image"
          size="sm"
        >
          <div className="space-y-4">
            
            <p>
              Are you sure you want to delete <span className="font-semibold">{selectedImage.title}</span>?
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GalleryManager;