import type { ApiResponse, PaginatedResponse } from '../types/api';
import type { Lead, LeadFilters, LeadFormValues } from '../types/lead';
import { http } from './http';

export async function fetchLeadsApi(filters: LeadFilters): Promise<PaginatedResponse<Lead>> {
  const response = await http.get<PaginatedResponse<Lead>>('/leads', {
    params: {
      status: filters.status || undefined,
      source: filters.source || undefined,
      search: filters.search || undefined,
      sort: filters.sort,
      page: filters.page
    }
  });

  return response.data;
}

export async function fetchLeadApi(id: string): Promise<Lead> {
  const response = await http.get<ApiResponse<Lead>>(`/leads/${id}`);
  return response.data.data;
}

export async function createLeadApi(payload: LeadFormValues): Promise<Lead> {
  const response = await http.post<ApiResponse<Lead>>('/leads', payload);
  return response.data.data;
}

export async function updateLeadApi(id: string, payload: LeadFormValues): Promise<Lead> {
  const response = await http.put<ApiResponse<Lead>>(`/leads/${id}`, payload);
  return response.data.data;
}

export async function deleteLeadApi(id: string): Promise<void> {
  await http.delete<ApiResponse<null>>(`/leads/${id}`);
}
