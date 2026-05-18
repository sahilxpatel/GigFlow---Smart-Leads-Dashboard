import type { Request, Response, NextFunction } from 'express';
import type { UserRole } from '../interfaces/user.js';
import { AppError } from '../utils/appError.js';

export function authorizeRoles(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new AppError('You do not have permission to perform this action', 403));
      return;
    }

    next();
  };
}
