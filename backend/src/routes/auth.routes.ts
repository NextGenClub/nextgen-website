import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { validateRegistration, validateLogin } from '../middleware/validation.middleware';

const router = Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

export default router;