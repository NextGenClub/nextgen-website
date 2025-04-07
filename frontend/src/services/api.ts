import axios from 'axios';

interface Idea {
  id?: number;
  title: string;
  description: string;
  votes?: number;
  submittedBy?: string | null;
  createdAt?: Date;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      method: config.method,
      url: config.url,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

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