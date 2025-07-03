import { useState } from 'react';
import { AppState, PageType } from '../types';

export const useAppState = () => {
  const [state, setState] = useState<AppState>({
    currentPage: 'auth',
    isLogin: true,
    showPassword: false,
    email: '',
    password: '',
    userName: 'ANDRES'
  });

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
    togglePassword
  };
};