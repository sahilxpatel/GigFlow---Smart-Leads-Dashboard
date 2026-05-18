import { Router } from 'express';
import { login, me, register } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { loginSchema, registerSchema } from '../validators/authValidators.js';

export const authRoutes = Router();

authRoutes.post('/register', validateRequest(registerSchema), register);
authRoutes.post('/login', validateRequest(loginSchema), login);
authRoutes.get('/me', authMiddleware, me);
