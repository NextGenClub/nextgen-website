import { Router } from 'express';
import { getDashboard } from '../controllers/dashboard.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Protected route - requires authentication
router.get('/', authenticate, getDashboard);

export default router;