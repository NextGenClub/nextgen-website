import { Router } from 'express';
import { createUser, getUserById, updateUser, deleteUser } from '../controllers/users.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Route to create a new user
router.post('/', createUser);

// Route to get a user by ID
router.get('/:id', authMiddleware, getUserById);

// Route to update a user by ID
router.put('/:id', authMiddleware, updateUser);

// Route to delete a user by ID
router.delete('/:id', authMiddleware, deleteUser);

export default router;