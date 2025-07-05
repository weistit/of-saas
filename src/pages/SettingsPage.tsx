import React from 'react';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { InfoBox } from '../components/InfoBox';
import { PageType } from '../types';

interface SettingsPageProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  onLogout,
  onNavigate
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar onLogout={onLogout} />

      <div className="flex">
        <Sidebar currentPage="settings" onNavigate={onNavigate} />

        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <InfoBox className="mb-8">
              Al confirmar la <strong>baja se desactivará</strong> tu automatización de correos, se eliminarán tus datos asociados (contactos, credenciales y registros) y dejarás de recibir facturación.
            </InfoBox>

            <div className="flex justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Abandonar servicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};