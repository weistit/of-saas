import React, { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { PasswordRequirement } from '../types';
import { useAuth } from '../hooks/useAuth';

interface AuthPageProps {
  isLogin: boolean;
  showPassword: boolean;
  email: string;
  password: string;
  onTogglePassword: () => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchMode: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  isLogin,
  showPassword,
  email,
  password,
  onTogglePassword,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSwitchMode
}) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (error: any) {
      setError(error.message || 'Authentication failed. Please try again.');
      console.error('Email auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements: PasswordRequirement[] = [
    { text: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Lowercase letter', met: /[a-z]/.test(password) },
    { text: 'Number', met: /\d/.test(password) },
    { text: 'Special character (e.g. !@#$%)', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { text: '8 characters or more', met: password.length >= 8 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar onLogout={() => {}} showUserActions={false} />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {isLogin ? 'Log In' : 'Sign Up'}
              </h1>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLoading ? 'Signing in...' : 'Continue with Google'}
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
                  onChange={(e) => onEmailChange(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors duration-200"
                  style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                  placeholder="mail@gmail.com"
                  required
                  disabled={isLoading}
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
                    onChange={(e) => onPasswordChange(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-[#57A777] transition-colors duration-200"
                    style={{ '--tw-ring-color': '#57A777' } as React.CSSProperties}
                    placeholder="••••••••••"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    disabled={isLoading}
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
                disabled={isLoading}
                className="w-full text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#57A777',
                  '--tw-ring-color': '#57A777'
                } as React.CSSProperties}
              >
                {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
              </button>

              {/* Bottom Links */}
              <div className="text-center space-y-2">
                {isLogin ? (
                  <>
                    <div>
                      <button
                        type="button"
                        onClick={onSwitchMode}
                        disabled={isLoading}
                        className="text-sm hover:opacity-80 transition-colors duration-200 disabled:opacity-50"
                      >
                        <span className="text-gray-900">No account? </span>
                        <span className="font-bold underline" style={{ color: '#57A777' }}>Create one</span>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        disabled={isLoading}
                        className="text-sm hover:opacity-80 transition-colors duration-200 underline disabled:opacity-50"
                        style={{ color: '#57A777' }}
                      >
                        Reset password
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onSwitchMode}
                    disabled={isLoading}
                    className="text-sm hover:opacity-80 transition-colors duration-200 disabled:opacity-50"
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
};