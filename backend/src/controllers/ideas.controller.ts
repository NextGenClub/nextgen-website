import { Request, Response } from 'express';
import Idea from '../models/idea.model';
import { validateIdeaSubmission } from '../utils/validators';

// Create a new idea
export const createIdea = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    // Validate the idea submission
    const { error } = validateIdeaSubmission(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const newIdea = new Idea({
            title,
            description,
            submittedBy: req.user ? req.user.id : null,
        });
        await newIdea.save();
        res.status(201).json(newIdea);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Get all ideas
export const getAllIdeas = async (req: Request, res: Response) => {
    try {
        const ideas = await Idea.find().sort({ createdAt: -1 });
        res.status(200).json(ideas);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Vote for an idea
export const voteForIdea = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const idea = await Idea.findById(id);
        if (!idea) return res.status(404).send('Idea not found');

        // Check if the user has already voted
        if (idea.votes.includes(req.user.id)) {
            return res.status(400).send('You have already voted for this idea');
        }

        idea.votes.push(req.user.id);
        await idea.save();
        res.status(200).json(idea);
    } catch (err) {
        res.status(500).send('Server error');
    }
};