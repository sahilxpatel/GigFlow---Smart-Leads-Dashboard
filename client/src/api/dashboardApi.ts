import type { ApiResponse } from '../types/api';
import type { DashboardSummary } from '../types/lead';
import { http } from './http';

export async function fetchDashboardSummaryApi(): Promise<DashboardSummary> {
  const response = await http.get<ApiResponse<DashboardSummary>>('/dashboard/stats');
  return response.data.data;
}
