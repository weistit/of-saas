import React from 'react';
import { ArrowLeft, Settings, Clipboard, Bot } from 'lucide-react';
import { PageType } from '../types';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'email-management' as PageType, label: 'Dashboard', icon: Clipboard },
    { id: 'content-business' as PageType, label: 'Content and business', icon: Bot },
    { id: 'settings' as PageType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <button 
        onClick={() => onNavigate('dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Tus servicios
      </button>
      
      <h2 className="text-xl font-bold text-gray-900 mb-8">
        Gestion de mail con IA
      </h2>

      <div className="space-y-3">
        {menuItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          
          return (
            <button 
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                isActive 
                  ? 'border-2 border-[#57A777] bg-green-50 text-gray-900'
                  : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 mr-3 text-gray-400" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};