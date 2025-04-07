import { Router } from 'express';
import { getGoogleAuthUrl, getGitHubAuthUrl, googleCallback, githubCallback } from '../controllers/oauth.controller';

const router = Router();

// Get OAuth URLs
router.get('/google/url', getGoogleAuthUrl);
router.get('/github/url', getGitHubAuthUrl);

// OAuth callbacks
router.get('/google/callback', googleCallback);
router.get('/github/callback', githubCallback);

export default router; 