import { Router } from 'express';
import authRoutes from './auth.routes';
import ideaRoutes from './ideas.routes';
import taskRoutes from './tasks.routes';
import projectRoutes from './projects.routes';
import dashboardRoutes from './dashboard.routes';
import profileRoutes from './profile.routes';

const router = Router();

// Public routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/ideas', ideaRoutes);
router.use('/tasks', taskRoutes);
router.use('/projects', projectRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/profile', profileRoutes);

export default router;