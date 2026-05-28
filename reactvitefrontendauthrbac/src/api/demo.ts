import api from './axios';

export const getPublicContent = () =>
  api.get<{ message: string }>('/public').then((r) => r.data);

export const getUserContent = () =>
  api.get<{ message: string }>('/user').then((r) => r.data);

export const getAdminContent = () =>
  api.get<{ message: string }>('/admin').then((r) => r.data);
