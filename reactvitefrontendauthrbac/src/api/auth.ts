import api from './axios';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export const registerUser = (data: RegisterPayload) =>
  api.post<AuthResponse>('/auth/register', data).then((r) => r.data);

export const loginUser = (data: LoginPayload) =>
  api.post<AuthResponse>('/auth/login', data).then((r) => r.data);
