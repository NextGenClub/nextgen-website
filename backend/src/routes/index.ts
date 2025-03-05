import { Router } from 'express';
import authRoutes from './auth.routes';
import dashboardRoutes from './dashboard.routes';
import ideasRoutes from './ideas.routes';
import tasksRoutes from './tasks.routes';
import usersRoutes from './users.routes';

const router = Router();

// Define routes
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/ideas', ideasRoutes);
router.use('/tasks', tasksRoutes);
router.use('/users', usersRoutes);

export default router;