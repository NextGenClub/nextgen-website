import api from './api';
import { Idea } from '../types/idea.types';

export const submitIdea = async (idea: Idea): Promise<Idea> => {
    const response = await api.post('/ideas', idea);
    return response.data;
};

export const fetchIdeas = async (): Promise<Idea[]> => {
    const response = await api.get('/ideas');
    return response.data;
};

export const voteOnIdea = async (ideaId: string): Promise<void> => {
    await api.post(`/ideas/${ideaId}/vote`);
};