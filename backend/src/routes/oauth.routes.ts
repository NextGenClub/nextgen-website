import { Router } from 'express';
import { googleAuth, githubAuth } from '../controllers/oauth.controller';

const router = Router();

// OAuth routes
router.post('/google', googleAuth);
router.post('/github', githubAuth);

export default router; 