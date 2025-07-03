import React from 'react';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmailManagementPage } from './pages/EmailManagementPage';
import { ContentBusinessPage } from './pages/ContentBusinessPage';
import { SettingsPage } from './pages/SettingsPage';
import { useAppState } from './hooks/useAppState';

function App() {
  const {
    state,
    updateState,
    navigateToPage,
    handleLogin,
    handleLogout,
    switchAuthMode,
    togglePassword
  } = useAppState();

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
          onLogout={handleLogout}
          onNavigateToEmailManagement={() => navigateToPage('email-management')}
        />
      );

    case 'email-management':
      return (
        <EmailManagementPage
          onLogout={handleLogout}
          onNavigate={navigateToPage}
        />
      );

    case 'content-business':
      return (
        <ContentBusinessPage
          onLogout={handleLogout}
          onNavigate={navigateToPage}
        />
      );

    case 'settings':
      return (
        <SettingsPage
          onLogout={handleLogout}
          onNavigate={navigateToPage}
        />
      );

    default:
      return null;
  }
}

export default App;