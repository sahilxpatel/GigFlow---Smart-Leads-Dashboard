import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getDashboardSummary } from '../services/dashboardService.js';
import type { ApiResponse } from '../interfaces/api.js';

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response<ApiResponse<unknown>>) => {
  const summary = await getDashboardSummary();

  res.status(200).json({
    success: true,
    message: 'Dashboard statistics fetched successfully',
    data: summary
  });
});
