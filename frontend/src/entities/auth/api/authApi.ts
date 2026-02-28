import api from '@/shared/api/client';
import type { AuthToken, LoginCredentials } from '@/entities/auth/model';

export async function loginRequest(credentials: LoginCredentials): Promise<AuthToken> {
  const formData = new FormData();
  formData.append('username', credentials.email);
  formData.append('password', credentials.password);

  const response = await api.post<AuthToken>('/auth/login', formData);
  return response.data;
}
