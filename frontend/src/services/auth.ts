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
  name: string;
  username: string;
}

// Register a new user
export const registerUser = async (userData: RegisterData): Promise<User> => {
  try {
    console.log('Making registration request with data:', userData);
    const response = await api.post('/api/auth/register', userData);
    console.log('Registration response:', response.data);
    
    if (response.data.user) {
      return response.data.user;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error: any) {
    // Log the error for debugging
    console.error('Registration error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Rethrow the error to be handled by the component
    throw error;
  }
};

// Login user
export const login = async (credentials: AuthCredentials): Promise<User> => {
  const response = await api.post('/api/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  return response.data.user;
};

// Login with Google
export const loginWithGoogle = async (token: string): Promise<User> => {
  const response = await api.post('/api/oauth/google', { token });
  localStorage.setItem('token', response.data.token);
  api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  return response.data.user;
};

// Login with GitHub
export const loginWithGitHub = async (token: string): Promise<User> => {
  const response = await api.post('/api/oauth/github', { token });
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