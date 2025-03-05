import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controller';

const router = Router();

// Route to get dashboard data
router.get('/', getDashboardData);

export default router;