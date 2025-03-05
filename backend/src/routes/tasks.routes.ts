import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../controllers/tasks.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Routes for task management
router.get('/tasks', authenticate, getTasks);
router.post('/tasks', authenticate, createTask);
router.put('/tasks/:id', authenticate, updateTask);
router.delete('/tasks/:id', authenticate, deleteTask);

export default router;