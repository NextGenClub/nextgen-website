import { api } from './api';

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name?: string;
}

// Register a new user
export const registerUser = async (userData: RegisterData): Promise<User> => {
  const response = await api.post('/api/auth/register', userData);
  return response.data.user;
};

// Login user
export const login = async (credentials: AuthCredentials): Promise<User> => {
  const response = await api.post('/api/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  return response.data.user;
};

// Logout user
export const logout = async (): Promise<void> => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.get('/api/auth/me');
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    return null;
  }
};