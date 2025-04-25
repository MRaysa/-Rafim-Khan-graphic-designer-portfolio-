import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ImageUpload from '../../components/admin/ImageUpload';
import GalleryManager from '../../components/admin/GalleryManager';
import { LogOut, UploadCloud, Grid, Settings } from 'lucide-react';
import Button from '../../components/ui/Button';
import Logo from '../../components/ui/Logo';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/admin-login');
    }
  }, [user, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col">
        <div className="mb-8">
          <Logo className="h-10 w-auto" />
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('upload')}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'upload'
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <UploadCloud size={18} className="mr-2" />
                Upload Images
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('manage')}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'manage'
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Grid size={18} className="mr-2" />
                Manage Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Settings size={18} className="mr-2" />
                Settings
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="mb-4">
            <p className="text-gray-300 font-medium">{user.name}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={handleLogout}
            icon={<LogOut size={16} />}
          >
            Log Out
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {activeTab === 'upload' && 'Upload Images'}
            {activeTab === 'manage' && 'Manage Gallery'}
            {activeTab === 'settings' && 'Settings'}
          </h1>
          <p className="text-gray-400">
            {activeTab === 'upload' && 'Upload new images to your gallery'}
            {activeTab === 'manage' && 'View, edit and delete images from your gallery'}
            {activeTab === 'settings' && 'Manage your account and preferences'}
          </p>
        </div>
        
        {activeTab === 'upload' && <ImageUpload />}
        {activeTab === 'manage' && <GalleryManager />}
        {activeTab === 'settings' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="text-gray-400 mb-6">
              Manage your account details and preferences.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                />
              </div>
              
              <div className="pt-4">
                <Button type="button">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;