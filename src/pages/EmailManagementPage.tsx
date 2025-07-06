import React, { useState, useEffect } from 'react';
import { Mail, Plus, Trash2 } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { InfoBox } from '../components/InfoBox';
import { PageType } from '../types';
import { useAuth } from '../hooks/useAuth';

interface EmailAccount {
  id: string;
  email: string;
  provider: string;
  is_active: boolean;
  created_at: string;
}

interface EmailManagementPageProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

type ProviderType = 'google' | 'outlook' | 'other';

export const EmailManagementPage: React.FC<EmailManagementPageProps> = ({
  onLogout,
  onNavigate
}) => {
  const { getEmailAccounts, signInWithGoogle, user } = useAuth();
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectingGoogle, setConnectingGoogle] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('google');
  const [isGoogleEnabled, setIsGoogleEnabled] = useState(true);
  const [customEmail, setCustomEmail] = useState('');

  useEffect(() => {
    loadEmailAccounts();
  }, []);

  const loadEmailAccounts = async () => {
    try {
      const accounts = await getEmailAccounts();
      setEmailAccounts(accounts);
    } catch (error) {
      console.error('Error loading email accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGoogle = async () => {
    try {
      setConnectingGoogle(true);
      await signInWithGoogle();
      // The auth state change will trigger a reload of accounts
    } catch (error) {
      console.error('Error connecting Google account:', error);
    } finally {
      setConnectingGoogle(false);
    }
  };

  const handleProviderSelect = (provider: ProviderType) => {
    setSelectedProvider(provider);
  };

  const handleToggleGoogle = () => {
    setIsGoogleEnabled(!isGoogleEnabled);
  };

  const renderProviderContent = () => {
    switch (selectedProvider) {
      case 'google':
        return (
          <div className="space-y-4">
            {user?.email ? (
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                    <p className="text-xs text-gray-500">Google Account</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isGoogleEnabled}
                      onChange={handleToggleGoogle}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#57A777]"></div>
                  </label>
                  <span className={`text-sm font-medium ${isGoogleEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                    {isGoogleEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleConnectGoogle}
                disabled={connectingGoogle}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#57A777] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    {connectingGoogle ? 'Connecting to Google...' : 'Connect your Google account'}
                  </div>
                  <div className="text-xs text-gray-500">
                    Click to authenticate with Gmail
                  </div>
                </div>
              </button>
            )}
          </div>
        );

      case 'outlook':
        return (
          <div className="space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-2">Outlook Integration</div>
              <div className="text-xs text-gray-500">Coming soon</div>
            </div>
          </div>
        );

      case 'other':
        return (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email address"
              value={customEmail}
              onChange={(e) => setCustomEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors"
              style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
            />
            <button 
              className="w-full bg-[#57A777] text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={!customEmail}
            >
              Add Email Account
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar onLogout={onLogout} />

      <div className="flex">
        <Sidebar currentPage="email-management" onNavigate={onNavigate} />

        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <InfoBox className="mb-8">
              <strong>Conecta</strong> aquí tus cuentas de <strong>correo</strong> en las que quieras activar la generación automática de borradores (Gmail, Outlook u otro), y añade el <strong>número de teléfono</strong> (WhatsApp o Telegram) al que quieras recibir cada borrador para revisarlo y validarlo antes de su envío.
            </InfoBox>

            {/* Email Accounts Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cuentas:</h3>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Connected Accounts */}
                {emailAccounts.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Connected Accounts:</h4>
                    <div className="space-y-2">
                      {emailAccounts.map((account) => (
                        <div key={account.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{account.email}</p>
                              <p className="text-xs text-gray-500 capitalize">{account.provider}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-green-600 font-medium">Connected</span>
                            <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Provider Selection */}
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <button 
                    onClick={() => handleProviderSelect('google')}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedProvider === 'google' 
                        ? 'border-[#57A777] bg-green-50 ring-2 ring-[#57A777] ring-opacity-20' 
                        : 'border-gray-300 hover:border-[#57A777]'
                    }`}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => handleProviderSelect('outlook')}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedProvider === 'outlook' 
                        ? 'border-[#57A777] bg-green-50 ring-2 ring-[#57A777] ring-opacity-20' 
                        : 'border-gray-300 hover:border-[#57A777]'
                    }`}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0078D4">
                      <path d="M7.462 0h9.076C19.4 0 21 1.6 21 4.462v15.076C21 22.4 19.4 24 16.538 24H7.462C4.6 24 3 22.4 3 19.538V4.462C3 1.6 4.6 0 7.462 0z"/>
                      <path d="M12 6.5L6.5 12 12 17.5 17.5 12 12 6.5z" fill="white"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => handleProviderSelect('other')}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedProvider === 'other' 
                        ? 'border-[#57A777] bg-green-50 ring-2 ring-[#57A777] ring-opacity-20' 
                        : 'border-gray-300 hover:border-[#57A777]'
                    }`}
                  >
                    <Mail className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Dynamic Content Based on Selection */}
                {renderProviderContent()}
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