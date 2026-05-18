import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError.js';

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction): void {
  next(new AppError('Route not found', 404));
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const appError = error instanceof AppError ? error : new AppError('Internal server error', 500);
  const statusCode = appError.statusCode ?? 500;

  res.status(statusCode).json({
    success: false,
    message: appError.message
  });
}
