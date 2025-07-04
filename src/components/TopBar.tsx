import React, { useState } from 'react';
import { User, Settings } from 'lucide-react';
import { LogoutModal } from './LogoutModal';

interface TopBarProps {
  onLogout: () => void;
  showUserActions?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onLogout, showUserActions = true }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
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
              <button 
                onClick={handleLogoutClick}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </>
  );
};