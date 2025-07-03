import React from 'react';
import { Mail, Plus } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { InfoBox } from '../components/InfoBox';
import { PageType } from '../types';

interface EmailManagementPageProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

export const EmailManagementPage: React.FC<EmailManagementPageProps> = ({
  onLogout,
  onNavigate
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar onLogout={onLogout} />

      <div className="flex">
        <Sidebar currentPage="email-management" onNavigate={onNavigate} />

        <div className="flex-1 p-8">
          <div className="max-w-2xl">
            <InfoBox className="mb-8">
              <strong>Conecta</strong> aquí tus cuentas de <strong>correo</strong> en las que quieras activar la generación automática de borradores (Gmail, Outlook u otro), y añade el <strong>número de teléfono</strong> (WhatsApp o Telegram) al que quieras recibir cada borrador para revisarlo y validarlo antes de su envío.
            </InfoBox>

            {/* Email Accounts Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cuentas:</h3>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#57A777] transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  
                  <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#57A777] transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0078D4">
                      <path d="M7.462 0h9.076C19.4 0 21 1.6 21 4.462v15.076C21 22.4 19.4 24 16.538 24H7.462C4.6 24 3 22.4 3 19.538V4.462C3 1.6 4.6 0 7.462 0z"/>
                      <path d="M12 6.5L6.5 12 12 17.5 17.5 12 12 6.5z" fill="white"/>
                    </svg>
                  </button>
                  
                  <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#57A777] transition-colors">
                    <Mail className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
                
                <input
                  type="email"
                  placeholder="test@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors"
                  style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                />
                
                <button className="w-8 h-8 rounded-full bg-[#57A777] flex items-center justify-center mt-4 ml-auto hover:opacity-90 transition-opacity">
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Phone Number Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Número de tlf.:</h3>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#57A777] transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.085"/>
                    </svg>
                  </button>
                  
                  <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#57A777] transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0088cc">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="flex space-x-3">
                  <select className="px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:border-[#57A777]">
                    <option>ES +34</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="999-999-999"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors"
                    style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};