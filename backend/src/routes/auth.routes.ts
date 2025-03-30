import { Router } from 'express';
import { register, login, getProfile, approveUser } from '../controllers/auth.controller';
import { validate } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../utils/validators';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected routes
router.get('/profile', authenticate, getProfile);

// Admin routes
router.put('/approve/:id', authenticate, isAdmin, approveUser);

export default router;