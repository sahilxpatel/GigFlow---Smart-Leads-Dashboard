import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError.js';
import { verifyToken } from '../utils/token.js';
import { User } from '../models/User.js';

export async function authMiddleware(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    next(new AppError('Authentication required', 401));
    return;
  }

  const token = authHeader.slice(7);
  const payload = verifyToken(token);
  const user = await User.findById(payload.user.id).select('+password');

  if (!user) {
    next(new AppError('User no longer exists', 401));
    return;
  }

  req.user = user;
  next();
}
