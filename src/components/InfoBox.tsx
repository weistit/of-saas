import React from 'react';

interface InfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-100 rounded-lg p-4 flex items-start ${className}`}>
      <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center mr-3 mt-0.5">
        <div className="w-2 h-2 rounded-full bg-white"></div>
      </div>
      <div className="text-sm text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
};