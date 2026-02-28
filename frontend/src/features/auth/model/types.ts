import type { LoginCredentials } from '@/entities/auth';

export interface UseAuthResult {
  isLoggedIn: boolean;
  isPending: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

export interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => Promise<boolean>;
  isPending: boolean;
}
