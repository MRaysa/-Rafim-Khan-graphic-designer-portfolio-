import React, { useState, useRef } from 'react';
import { UploadCloud, X, Image, Check } from 'lucide-react';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

const ImageUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    allowDownload: false
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter(
      file => file.type.startsWith('image/')
    );
    
    setSelectedFiles(prev => [...prev, ...newFiles]);
    
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };
  
  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsUploading(true);
    setUploadStatus('idle');
    
    const initialProgress: Record<string, number> = {};
    selectedFiles.forEach(file => {
      initialProgress[file.name] = 0;
    });
    setUploadProgress(initialProgress);
    
    try {
      const uploadedImages = [];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: progress
          }));
        }
        
        // Create a new gallery image entry
        const newImage = {
          id: `img_${Date.now()}_${i}`,
          url: previews[i], // In a real app, this would be the uploaded file URL
          title: formData.title || file.name,
          description: formData.description || '',
          tags: formData.tags,
          downloadable: formData.allowDownload
        };
        
        uploadedImages.push(newImage);
      }
      
      // Update gallery data in localStorage
      const existingImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
      const updatedImages = [...existingImages, ...uploadedImages];
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
      
      setUploadStatus('success');
      
      // Reset form
      setSelectedFiles([]);
      setPreviews([]);
      setFormData({
        title: '',
        description: '',
        tags: [],
        allowDownload: false
      });
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${
          dragActive 
            ? 'border-pink-500 bg-pink-500/10' 
            : 'border-gray-600 hover:border-gray-500'
        } transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="mb-4">
          <UploadCloud className="w-12 h-12 mx-auto text-gray-400" />
        </div>
        
        <p className="text-gray-300 mb-2">
          Drag & drop images here, or <button 
            onClick={() => inputRef.current?.click()} 
            className="text-blue-400 hover:text-blue-300 focus:outline-none"
          >
            browse
          </button>
        </p>
        
        <p className="text-gray-500 text-sm">
          Supports: JPG, PNG, GIF (max 5MB each)
        </p>
        
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Selected Images ({selectedFiles.length})</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-700">
                  <img 
                    src={preview} 
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 bg-gray-900/80 rounded-full text-gray-400 hover:text-white"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
                
                {isUploading && (
                  <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                    <LoadingSpinner size="sm" />
                    <p className="text-xs text-center mt-1 text-gray-300">
                      {uploadProgress[selectedFiles[index].name] || 0}%
                    </p>
                  </div>
                )}
                
                <p className="text-xs text-gray-400 mt-1 truncate">
                  {selectedFiles[index].name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Image Details</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
              placeholder="Image title"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors resize-none"
              placeholder="Brief description of the image"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags.join(', ')}
              onChange={handleTagChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
              placeholder="branding, print, web, etc."
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="allowDownload"
              name="allowDownload"
              type="checkbox"
              checked={formData.allowDownload}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-600 text-pink-500 focus:ring-pink-500"
            />
            <label htmlFor="allowDownload" className="ml-2 block text-sm">
              Allow visitors to download this image
            </label>
          </div>
        </div>
      </div>
      
      {uploadStatus === 'success' && (
        <div className="mb-6 p-3 bg-green-500/20 border border-green-500 rounded-lg flex items-center">
          <Check className="text-green-500 mr-2" size={18} />
          <span className="text-green-400">Images uploaded successfully!</span>
        </div>
      )}
      
      {uploadStatus === 'error' && (
        <div className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-lg flex items-center">
          <X className="text-red-500 mr-2" size={18} />
          <span className="text-red-400">Failed to upload images. Please try again.</span>
        </div>
      )}
      
      <div className="flex space-x-4">
        <Button
          variant="primary"
          icon={isUploading ? <LoadingSpinner size="sm" /> : <UploadCloud size={18} />}
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Images'}
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            setSelectedFiles([]);
            setPreviews([]);
            setFormData({
              title: '',
              description: '',
              tags: [],
              allowDownload: false
            });
          }}
          disabled={selectedFiles.length === 0 || isUploading}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;