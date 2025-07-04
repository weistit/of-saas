import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { LogoutModal } from '../components/LogoutModal';

interface DashboardPageProps {
  userName: string;
  onLogout: () => void;
  onNavigateToEmailManagement: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  userName,
  onLogout,
  onNavigateToEmailManagement
}) => {
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
    <div className="min-h-screen bg-gray-50">
      <TopBar onLogout={onLogout} />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">
            WELCOME <span style={{ color: '#57A777' }}>{userName}</span>
          </h1>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Gestión de e-mails con <span style={{ color: '#57A777' }}>IA</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Automatically categorize, respond to, and organize customer and lead emails. Ideal for businesses with high inquiries.
              </p>
            </div>
            
            <button 
              onClick={onNavigateToEmailManagement}
              className="w-full text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: '#57A777' }}
            >
              Gestionar
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8">
        <button 
          onClick={handleLogoutClick}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow-lg transition-colors duration-200"
        >
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </div>
  );
};