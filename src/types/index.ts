export type PageType = 'auth' | 'dashboard' | 'email-management' | 'content-business' | 'settings';

export interface PasswordRequirement {
  text: string;
  met: boolean;
}

export interface AppState {
  currentPage: PageType;
  isLogin: boolean;
  showPassword: boolean;
  email: string;
  password: string;
  userName: string;
}