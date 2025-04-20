import express from 'express';
import { getProfile, updateProfile, getTeamMembers } from '../controllers/profile.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Simple test route
router.get('/debug', (req, res) => {
  res.json({ message: 'Profile routes are working' });
});

// Get user's own profile - temporarily remove authentication for testing
router.get('/', getProfile);

// Update user's profile - temporarily remove authentication for testing
router.put('/', updateProfile);

// Get team members
router.get('/team', getTeamMembers);

export default router; 