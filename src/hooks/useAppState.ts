import { useState, useEffect } from 'react';
import { AppState, PageType } from '../types';
import { useAuth } from './useAuth';

export const useAppState = () => {
  const { user, loading } = useAuth();
  const [state, setState] = useState<AppState>({
    currentPage: 'auth',
    isLogin: true,
    showPassword: false,
    email: '',
    password: '',
    userName: 'ANDRES'
  });

  // Update page based on authentication state
  useEffect(() => {
    if (!loading) {
      if (user && state.currentPage === 'auth') {
        setState(prev => ({ 
          ...prev, 
          currentPage: 'dashboard',
          userName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
        }));
      } else if (!user && state.currentPage !== 'auth') {
        setState(prev => ({ ...prev, currentPage: 'auth' }));
      }
    }
  }, [user, loading, state.currentPage]);

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const navigateToPage = (page: PageType) => {
    updateState({ currentPage: page });
  };

  const handleLogin = () => {
    navigateToPage('dashboard');
  };

  const handleLogout = () => {
    updateState({
      currentPage: 'auth',
      email: '',
      password: '',
      showPassword: false
    });
  };

  const switchAuthMode = () => {
    updateState({
      isLogin: !state.isLogin,
      email: '',
      password: '',
      showPassword: false
    });
  };

  const togglePassword = () => {
    updateState({ showPassword: !state.showPassword });
  };

  return {
    state,
    updateState,
    navigateToPage,
    handleLogin,
    handleLogout,
    switchAuthMode,
    togglePassword,
    loading
  };
};