import React from 'react';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmailManagementPage } from './pages/EmailManagementPage';
import { ContentBusinessPage } from './pages/ContentBusinessPage';
import { SettingsPage } from './pages/SettingsPage';
import { useAppState } from './hooks/useAppState';
import { useAuth } from './hooks/useAuth';

function App() {
  const {
    state,
    updateState,
    navigateToPage,
    handleLogin,
    handleLogout,
    switchAuthMode,
    togglePassword,
    loading
  } = useAppState();

  const { signOut } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { 
      email: state.email, 
      password: state.password, 
      isLogin: state.isLogin 
    });
    handleLogin();
  };

  const handleEmailChange = (email: string) => {
    updateState({ email });
  };

  const handlePasswordChange = (password: string) => {
    updateState({ password });
  };

  const handleActualLogout = async () => {
    try {
      await signOut();
      handleLogout();
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate to auth page even if logout fails
      handleLogout();
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#57A777] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  switch (state.currentPage) {
    case 'auth':
      return (
        <AuthPage
          isLogin={state.isLogin}
          showPassword={state.showPassword}
          email={state.email}
          password={state.password}
          onTogglePassword={togglePassword}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onSubmit={handleSubmit}
          onSwitchMode={switchAuthMode}
        />
      );

    case 'dashboard':
      return (
        <DashboardPage
          userName={state.userName}
          onLogout={handleActualLogout}
          onNavigateToEmailManagement={() => navigateToPage('email-management')}
        />
      );

    case 'email-management':
      return (
        <EmailManagementPage
          onLogout={handleActualLogout}
          onNavigate={navigateToPage}
        />
      );

    case 'content-business':
      return (
        <ContentBusinessPage
          onLogout={handleActualLogout}
          onNavigate={navigateToPage}
        />
      );

    case 'settings':
      return (
        <SettingsPage
          onLogout={handleActualLogout}
          onNavigate={navigateToPage}
        />
      );

    default:
      return null;
  }
}

export default App;