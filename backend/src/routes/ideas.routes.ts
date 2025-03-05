import { Router } from 'express';
import { createIdea, getIdeas, voteIdea } from '../controllers/ideas.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Route for creating a new idea
router.post('/', createIdea);

// Route for retrieving all ideas
router.get('/', getIdeas);

// Route for voting on an idea (authenticated users only)
router.post('/:id/vote', authMiddleware, voteIdea);

export default router;