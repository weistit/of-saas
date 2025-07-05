import React, { useRef, useEffect } from 'react';
import { LogOut, User, Settings } from 'lucide-react';

interface SettingsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  isLoading?: boolean;
  position?: 'up' | 'down';
}

export const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  isOpen,
  onClose,
  onLogout,
  isLoading = false,
  position = 'up'
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses = position === 'up' 
    ? 'bottom-full right-0 mb-2 origin-bottom-right' 
    : 'top-full right-0 mt-2 origin-top-right';

  const handleLogoutClick = () => {
    onClose();
    onLogout();
  };

  return (
    <div 
      ref={dropdownRef}
      className={`absolute ${positionClasses} w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 transform transition-all duration-200`}
    >
      {/* Profile Section */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">ANDRES</p>
            <p className="text-xs text-gray-500">Account settings</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <button
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => {
            // Handle profile settings
            onClose();
          }}
        >
          <Settings className="w-4 h-4 mr-3 text-gray-400" />
          Settings
        </button>
        
        <button
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => {
            // Handle profile view
            onClose();
          }}
        >
          <User className="w-4 h-4 mr-3 text-gray-400" />
          Profile
        </button>
      </div>

      {/* Logout Section */}
      <div className="border-t border-gray-100 py-1">
        <button
          onClick={handleLogoutClick}
          disabled={isLoading}
          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-4 h-4 mr-3" />
          {isLoading ? 'Logging out...' : 'Log out'}
        </button>
      </div>
    </div>
  );
};