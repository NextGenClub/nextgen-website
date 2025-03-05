import { Idea } from '../models/idea.model';
import { User } from '../models/user.model';
import { Vote } from '../models/vote.model';

// Function to create a new idea
export const createIdea = async (ideaData: Idea, userId: string) => {
    const newIdea = new Idea({
        ...ideaData,
        submittedBy: userId,
    });
    return await newIdea.save();
};

// Function to get all ideas with optional filtering
export const getAllIdeas = async (filter?: any) => {
    return await Idea.find(filter).populate('submittedBy', 'username');
};

// Function to get a specific idea by ID
export const getIdeaById = async (id: string) => {
    return await Idea.findById(id).populate('submittedBy', 'username');
};

// Function to update an idea
export const updateIdea = async (id: string, updateData: Partial<Idea>) => {
    return await Idea.findByIdAndUpdate(id, updateData, { new: true });
};

// Function to delete an idea
export const deleteIdea = async (id: string) => {
    return await Idea.findByIdAndDelete(id);
};

// Function to vote on an idea
export const voteOnIdea = async (ideaId: string, userId: string) => {
    const existingVote = await Vote.findOne({ ideaId, userId });
    if (existingVote) {
        throw new Error('User has already voted on this idea');
    }
    const newVote = new Vote({ ideaId, userId });
    await newVote.save();
};

// Function to get vote count for an idea
export const getVoteCount = async (ideaId: string) => {
    return await Vote.countDocuments({ ideaId });
};