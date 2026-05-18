import type { ApiResponse } from '../types/api';
import type { AuthPayload, AuthUser } from '../types/auth';
import type { LoginFormValues, RegisterFormValues } from '../utils/schemas';
import { http } from './http';

interface AuthEnvelope {
  user: AuthUser;
  token: string;
}

export async function loginApi(payload: LoginFormValues): Promise<AuthPayload> {
  const response = await http.post<ApiResponse<AuthEnvelope>>('/auth/login', payload);
  return response.data.data;
}

export async function registerApi(payload: RegisterFormValues): Promise<AuthPayload> {
  const response = await http.post<ApiResponse<AuthEnvelope>>('/auth/register', payload);
  return response.data.data;
}

export async function fetchMeApi(): Promise<AuthUser> {
  const response = await http.get<ApiResponse<AuthUser>>('/auth/me');
  return response.data.data;
}
