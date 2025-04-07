import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Idea {
  id?: number;
  title: string;
  description: string;
  votes?: number;
  submittedBy?: string | null;
  createdAt?: Date;
}

// Get ideas
export const getIdeas = async (): Promise<Idea[]> => {
  const response = await api.get('/api/ideas');
  return response.data;
};

// Submit an idea
export const submitIdea = async (idea: Idea): Promise<Idea> => {
  const response = await api.post('/api/ideas', idea);
  return response.data;
};

// Vote on an idea
export const voteOnIdea = async (ideaId: number): Promise<Idea> => {
  const response = await api.post(`/api/ideas/${ideaId}/vote`);
  return response.data;
};