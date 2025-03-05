import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API call to get ideas
export const getIdeas = async () => {
  const response = await api.get('/ideas');
  return response.data;
};

// Example API call to submit an idea
export const submitIdea = async (idea) => {
  const response = await api.post('/ideas', idea);
  return response.data;
};

// Example API call to vote on an idea
export const voteOnIdea = async (ideaId) => {
  const response = await api.post(`/ideas/${ideaId}/vote`);
  return response.data;
};