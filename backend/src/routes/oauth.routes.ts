import express from 'express';
import { googleAuth, googleCallback, githubAuth, githubCallback } from '../controllers/oauth.controller';

const router = express.Router();

// Google OAuth routes
router.get('/google', googleAuth);
router.post('/google/callback', googleCallback);

// GitHub OAuth routes
router.get('/github', githubAuth);
router.post('/github/callback', githubCallback);

export default router; 