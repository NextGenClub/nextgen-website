import { api } from './api';
import { Idea } from '../types/idea.types';

export const submitIdea = async (idea: Idea): Promise<Idea> => {
    const response = await api.post('/api/ideas', idea);
    return response.data.idea;
};

export const getIdeas = async (): Promise<Idea[]> => {
    const response = await api.get('/api/ideas');
    return response.data.ideas;
};

export const getIdeaById = async (id: string): Promise<Idea> => {
    const response = await api.get(`/api/ideas/${id}`);
    return response.data;
};

export const getTopIdeas = async (limit: number = 5): Promise<Idea[]> => {
    const response = await api.get('/api/ideas', {
        params: {
            sortBy: 'voteCount',
            order: 'desc',
            limit
        }
    });
    return response.data.ideas;
};

export const getTopRankedIdeas = async (limit: number = 5): Promise<Idea[]> => {
    return getTopIdeas(limit);
};

export const voteOnIdea = async (ideaId: string | number): Promise<Idea> => {
    const response = await api.post(`/api/ideas/${ideaId}/vote`);
    return response.data.idea;
};

export const removeVote = async (ideaId: string | number): Promise<Idea> => {
    const response = await api.delete(`/api/ideas/${ideaId}/vote`);
    return response.data.idea;
};