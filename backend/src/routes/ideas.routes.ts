import { Router } from 'express';
import { 
  getIdeas, 
  getIdeaById, 
  createIdea, 
  updateIdea, 
  deleteIdea, 
  voteForIdea, 
  removeVote 
} from '../controllers/ideas.controller';
import { authenticate, isApproved } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { ideaSchema } from '../utils/validators';

const router = Router();

// Public routes
router.get('/', getIdeas);
router.get('/:id', getIdeaById);
router.post('/', validate(ideaSchema), createIdea);

// Protected routes (requires authentication)
router.put('/:id', authenticate, validate(ideaSchema), updateIdea);
router.delete('/:id', authenticate, deleteIdea);

// Voting routes (requires authentication and approval)
router.post('/:id/vote', authenticate, isApproved, voteForIdea);
router.delete('/:id/vote', authenticate, isApproved, removeVote);

export default router;