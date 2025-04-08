import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Only require authentication in production
if (process.env.NODE_ENV !== 'development') {
  router.use(authenticate);
}

// Get dashboard data
router.get('/', getDashboardData);

export default router;