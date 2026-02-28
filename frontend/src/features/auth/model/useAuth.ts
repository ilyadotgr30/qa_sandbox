import { useState } from 'react';
import { loginRequest, type LoginCredentials } from '@/entities/auth';
import type { UseAuthResult } from '@/features/auth/model';

const TOKEN_KEY = 'cyber_token';

export function useAuth(): UseAuthResult {
  const [isPending, setIsPending] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsPending(true);
    try {
      const token = await loginRequest(credentials);
      localStorage.setItem(TOKEN_KEY, token.access_token);
      setIsLoggedIn(true);
      return true;
    } catch {
      alert('Error: unauthorized');
      return false;
    } finally {
      setIsPending(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    isPending,
    login,
    logout,
  };
}
