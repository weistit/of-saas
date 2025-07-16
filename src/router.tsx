import { createBrowserRouter, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmailManagementPage } from './pages/EmailManagementPage';
import { ContentBusinessPage } from './pages/ContentBusinessPage';
import { SettingsPage } from './pages/SettingsPage';
import { useAuth } from './hooks/useAuth';
import { PageType } from './types';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <AuthPage
      isLogin
      showPassword={showPassword}
      email={email}
      password={password}
      onTogglePassword={() => setShowPassword(!showPassword)}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={() => {}}
      onSwitchMode={() => navigate('/signup')}
    />
  );
};

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <AuthPage
      isLogin={false}
      showPassword={showPassword}
      email={email}
      password={password}
      onTogglePassword={() => setShowPassword(!showPassword)}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={() => {}}
      onSwitchMode={() => navigate('/signin')}
    />
  );
};

const Dashboard = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <DashboardPage
      userName={user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
      onLogout={handleLogout}
      onNavigateToEmailManagement={() => navigate('/email-management')}
    />
  );
};

const EmailManagement = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <EmailManagementPage
      onLogout={handleLogout}
      onNavigate={(page: PageType) => navigate(`/${page}`)}
    />
  );
};

const ContentBusiness = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <ContentBusinessPage
      onLogout={handleLogout}
      onNavigate={(page: PageType) => navigate(`/${page}`)}
    />
  );
};

const Settings = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <SettingsPage
      onLogout={handleLogout}
      onNavigate={(page: PageType) => navigate(`/${page}`)}
    />
  );
};

export const router = createBrowserRouter([
  { path: '/', element: <SignIn /> },
  { path: '/auth', element: <SignIn /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/email-management', element: <EmailManagement /> },
  { path: '/content-business', element: <ContentBusiness /> },
  { path: '/settings', element: <Settings /> },
]);

export default router;
