import { Router } from 'express';
import { 
  getTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/tasks.controller';
import { authenticate, isApproved } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { taskSchema } from '../utils/validators';

const router = Router();

// Protected routes - require authentication and approval
router.get('/', authenticate, isApproved, getTasks);
router.get('/:id', authenticate, isApproved, getTaskById);
router.post('/', authenticate, isApproved, validate(taskSchema), createTask);
router.put('/:id', authenticate, isApproved, validate(taskSchema), updateTask);
router.delete('/:id', authenticate, isApproved, deleteTask);

export default router;