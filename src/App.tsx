import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check, X, User, Settings, ArrowLeft, Plus, Phone, Upload } from 'lucide-react';

interface PasswordRequirement {
  text: string;
  met: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'auth' | 'dashboard' | 'email-management' | 'content-business' | 'settings'>('auth');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('ANDRES');

  const passwordRequirements: PasswordRequirement[] = [
    { text: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Lowercase letter', met: /[a-z]/.test(password) },
    { text: 'Number', met: /\d/.test(password) },
    { text: 'Special character (e.g. !@#$%)', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { text: '8 characters or more', met: password.length >= 8 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, isLogin });
    // Simulate successful login/signup
    setCurrentPage('dashboard');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  const handleLogout = () => {
    setCurrentPage('auth');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  const navigateToEmailManagement = () => {
    setCurrentPage('email-management');
  };

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const navigateToContentBusiness = () => {
    setCurrentPage('content-business');
  };

  const navigateToSettings = () => {
    setCurrentPage('settings');
  };

  if (currentPage === 'settings') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex justify-center flex-1">
              <img 
                src="/logo.jpg" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <User className="w-6 h-6" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
            <button 
              onClick={navigateToDashboard}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tus servicios
            </button>
            
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              Gestion de mail con IA
            </h2>

            <div className="space-y-3">
              <button 
                onClick={navigateToEmailManagement}
                className="w-full flex items-center px-4 py-3 text-left rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <div className="w-6 h-6 rounded-full border border-gray-300 mr-3 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
                Dashboard
              </button>
              
              <button 
                onClick={navigateToContentBusiness}
                className="w-full flex items-center px-4 py-3 text-left rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <div className="w-6 h-6 rounded-full border border-gray-300 mr-3 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
                Content and business
              </button>
              
              <button className="w-full flex items-center px-4 py-3 text-left rounded-lg border-2 border-[#57A777] bg-green-50 text-gray-900">
                <div className="w-2 h-2 rounded-full bg-[#57A777] mr-3"></div>
                Settings
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-2xl">
              {/* Warning Box */}
              <div className="bg-gray-100 rounded-lg p-6 mb-8 flex items-start">
                <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  Al confirmar la <strong>baja se desactivará</strong> tu automatización de correos, se eliminarán tus datos asociados (contactos, credenciales y registros) y dejarás de recibir facturación.
                </div>
              </div>

              {/* Abandon Service Button */}
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
  }

  if (currentPage === 'content-business') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex justify-center flex-1">
              <img 
                src="/logo.jpg" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <User className="w-6 h-6" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
            <button 
              onClick={navigateToDashboard}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tus servicios
            </button>
            
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              Gestion de mail con IA
            </h2>

            <div className="space-y-3">
              <button 
                onClick={navigateToEmailManagement}
                className="w-full flex items-center px-4 py-3 text-left rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <div className="w-6 h-6 rounded-full border border-gray-300 mr-3 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
                Dashboard
              </button>
              
              <button className="w-full flex items-center px-4 py-3 text-left rounded-lg border-2 border-[#57A777] bg-green-50 text-gray-900">
                <div className="w-2 h-2 rounded-full bg-[#57A777] mr-3"></div>
                Content and business
              </button>
              
              <button 
                onClick={navigateToSettings}
                className="w-full flex items-center px-4 py-3 text-left rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <Settings className="w-5 h-5 mr-3 text-gray-400" />
                Settings
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-2xl">
              {/* Info Box */}
              <div className="bg-gray-100 rounded-lg p-4 mb-8 flex items-start">
                <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  Introduce los <strong>datos clave</strong> de tu negocio que el <strong>agente</strong> usará siempre al redactar correos: nombre, descripción breve, ubicación, horario, plazos, métodos de pago, políticas y contactos de soporte. Además, aquí podrás subir tu <strong>catálogo de productos</strong> y servicios para que el sistema aprenda tu estilo.
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nombre de la empresa:
                  </label>
                  <input
                    type="text"
                    placeholder="Imprenta Textil S.L."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors"
                    style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Descripción (breve):
                  </label>
                  <textarea
                    placeholder="Proveedores de serigrafía y textil personalizado en Madrid."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors resize-none"
                    style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                  />
                </div>

                {/* Location and Schedule */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Ubicación:
                    </label>
                    <input
                      type="text"
                      placeholder="Madrid (España), 07071"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors"
                      style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Horario:
                    </label>
                    <input
                      type="text"
                      placeholder="Lun-Vie 08:00-17:00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors"
                      style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                    />
                  </div>
                </div>

                {/* Delivery Time and Payment Methods */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Plazo de envío:
                    </label>
                    <input
                      type="text"
                      placeholder="3-5 días laborables"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors"
                      style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Métodos de pago:
                    </label>
                    <input
                      type="text"
                      placeholder="Transferencia, tarjeta y PayPal"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors"
                      style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                    />
                  </div>
                </div>

                {/* Return Policy */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Política de devoluciones:
                  </label>
                  <input
                    type="text"
                    placeholder="Hasta 14 días, gastos de envío por cuenta del cliente"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors"
                    style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                  />
                </div>

                {/* Support Contact */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Contacto soporte:
                  </label>
                  <input
                    type="text"
                    placeholder="soporte@imprentatextil.com / +34 912 345 678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors"
                    style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                  />
                </div>

                {/* Main Catalog */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Catálogo principal:
                  </label>
                  <div className="text-xs text-gray-500 mb-3">
                    Sube un .pdf con tu catálogo o productos principales
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <button className="flex items-center justify-center w-full">
                      <div className="bg-gray-200 rounded-full p-3 mb-2">
                        <Upload className="w-5 h-5 text-gray-500" />
                      </div>
                    </button>
                    <div className="text-sm text-gray-600">Subir archivo</div>
                  </div>
                </div>

                {/* Additional Info Box */}
                <div className="bg-gray-100 rounded-lg p-4 flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    Carga un fichero (CSV o PDF) con tu <strong>catálogo de productos</strong> o servicios (incluyendo nombres y precios) o bien añade directamente ejemplos de correos (preguntas y respuestas) que quieras que el sistema aprenda tu estilo.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'email-management') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex justify-center flex-1">
              <img 
                src="/logo.jpg" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <User className="w-6 h-6" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
            <button 
              onClick={navigateToDashboard}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tus servicios
            </button>
            
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              Gestion de mail con IA
            </h2>

            <div className="space-y-3">
              <button className="w-full flex items-center px-4 py-3 text-left rounded-lg border-2 border-[#57A777] bg-green-50 text-gray-900">
                <div className="w-2 h-2 rounded-full bg-[#57A777] mr-3"></div>
                Dashboard
              </button>
              
              <button 
                onClick={navigateToContentBusiness}
                className="w-full flex items-center px-4 py-3 text-left rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <div className="w-6 h-6 rounded-full border border-gray-300 mr-3 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
                Content and business
              </button>
              
              <button 
                onClick={navigateToSettings}
                className="w-full flex items-center px-4 py-3 text-left rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <Settings className="w-5 h-5 mr-3 text-gray-400" />
                Settings
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-2xl">
              {/* Info Box */}
              <div className="bg-gray-100 rounded-lg p-4 mb-8 flex items-start">
                <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <strong>Conecta</strong> aquí tus cuentas de <strong>correo</strong> en las que quieras activar la generación automática de borradores (Gmail, Outlook u otro), y añade el <strong>número de teléfono</strong> (WhatsApp o Telegram) al que quieras recibir cada borrador para revisarlo y validarlo antes de su envío.
                </div>
              </div>

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
  }

  if (currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex justify-center flex-1">
              <img 
                src="/logo.jpg" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <User className="w-6 h-6" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-2xl">
            {/* Welcome Message */}
            <h1 className="text-4xl font-bold text-gray-900 mb-12">
              WELCOME <span style={{ color: '#57A777' }}>{userName}</span>
            </h1>

            {/* Feature Card */}
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
                onClick={navigateToEmailManagement}
                className="w-full text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: '#57A777' }}
              >
                Gestionar
              </button>
            </div>
          </div>
        </div>

        {/* Settings Button (Bottom Right) */}
        <div className="fixed bottom-8 right-8">
          <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow-lg transition-colors duration-200">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="flex justify-center">
          <img 
            src="/logo.jpg" 
            alt="Logo" 
            className="h-12 w-auto"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Page Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {isLogin ? 'Log In' : 'Sign Up'}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Google Sign In */}
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors duration-200"
                  style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                  placeholder="mail@gmail.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors duration-200"
                    style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                    placeholder="••••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements (Signup only) */}
              {!isLogin && password && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          req.met 
                            ? 'border-[#57A777]' 
                            : 'border-gray-300'
                        }`}
                        style={req.met ? { backgroundColor: '#57A777' } : {}}>
                          {req.met && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className={`text-sm ${req.met ? 'text-[#57A777]' : 'text-gray-500'}`}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                style={{ 
                  backgroundColor: '#57A777',
                  '--tw-ring-color': '#57A777'
                } as React.CSSProperties}
              >
                {isLogin ? 'Log In' : 'Sign Up'}
              </button>

              {/* Bottom Links */}
              <div className="text-center space-y-2">
                {isLogin ? (
                  <>
                    <div>
                      <button
                        type="button"
                        onClick={switchMode}
                        className="text-sm hover:opacity-80 transition-colors duration-200"
                      >
                        <span className="text-gray-900">No account? </span>
                        <span className="font-bold underline" style={{ color: '#57A777' }}>Create one</span>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="text-sm hover:opacity-80 transition-colors duration-200 underline"
                        style={{ color: '#57A777' }}
                      >
                        Reset password
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-sm hover:opacity-80 transition-colors duration-200"
                    style={{ color: '#57A777' }}
                  >
                    Have an account? <span className="underline">Sign In Now</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;