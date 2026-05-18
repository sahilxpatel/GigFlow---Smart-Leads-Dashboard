import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCurrentUser, loginUser, registerUser } from '../services/authService.js';
import type { ApiResponse } from '../interfaces/api.js';

export const register = asyncHandler(async (req: Request, res: Response<ApiResponse<unknown>>) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: result
  });
});

export const login = asyncHandler(async (req: Request, res: Response<ApiResponse<unknown>>) => {
  const result = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result
  });
});

export const me = asyncHandler(async (req: Request, res: Response<ApiResponse<unknown>>) => {
  const user = await getCurrentUser(req.user!._id.toString());

  res.status(200).json({
    success: true,
    message: 'Current user fetched successfully',
    data: user
  });
});
