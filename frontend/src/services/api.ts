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