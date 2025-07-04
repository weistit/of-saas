import React, { useState } from 'react';
import { User, Settings } from 'lucide-react';
import { SettingsDropdown } from './SettingsDropdown';

interface TopBarProps {
  onLogout: () => void;
  showUserActions?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onLogout, showUserActions = true }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSettingsClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
      setShowDropdown(false);
    }
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex justify-center flex-1">
          <img 
            src="/logo.jpg" 
            alt="Logo" 
            className="h-12 w-auto"
          />
        </div>
        {showUserActions && (
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <User className="w-6 h-6" />
            </button>
            <div className="relative">
              <button 
                onClick={handleSettingsClick}
                className={`p-2 text-gray-400 hover:text-gray-600 transition-colors ${
                  showDropdown ? 'text-gray-600' : ''
                }`}
              >
                <Settings className="w-6 h-6" />
              </button>
              
              <SettingsDropdown
                isOpen={showDropdown}
                onClose={handleCloseDropdown}
                onLogout={handleLogout}
                isLoading={isLoggingOut}
                position="down"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};