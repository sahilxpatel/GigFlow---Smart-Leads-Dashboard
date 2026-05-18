import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createLead, deleteLead, getLeadById, listLeads, updateLead } from '../services/leadService.js';
import type { ApiResponse, PaginatedResponse } from '../interfaces/api.js';
import { AppError } from '../utils/appError.js';
import type { LeadFilterQuery, LeadSource, LeadStatus } from '../interfaces/lead.js';

const leadStatuses = ['New', 'Contacted', 'Qualified', 'Lost'] as const;
const leadSources = ['Website', 'Instagram', 'Referral'] as const;

function requireStringParam(value: string | string[] | undefined, label: string): string {
  if (typeof value !== 'string' || !value) {
    throw new AppError(`${label} is required`, 400);
  }

  return value;
}

function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === 'string' && leadStatuses.includes(value as LeadStatus);
}

function isLeadSource(value: unknown): value is LeadSource {
  return typeof value === 'string' && leadSources.includes(value as LeadSource);
}

export const getLeads = asyncHandler(async (req: Request, res: Response<PaginatedResponse<unknown>>) => {
  const filters: LeadFilterQuery = {
    sort: req.query.sort === 'oldest' ? 'oldest' : 'latest',
    page: req.query.page ? Number(req.query.page) : 1
  };

  if (isLeadStatus(req.query.status)) {
    filters.status = req.query.status;
  }

  if (isLeadSource(req.query.source)) {
    filters.source = req.query.source;
  }

  if (typeof req.query.search === 'string' && req.query.search.trim()) {
    filters.search = req.query.search.trim();
  }

  const result = await listLeads(filters);

  res.status(200).json({
    success: true,
    message: 'Leads fetched successfully',
    data: result.data,
    pagination: result.pagination
  });
});

export const getLead = asyncHandler(async (req: Request, res: Response<ApiResponse<unknown>>) => {
  const lead = await getLeadById(requireStringParam(req.params.id, 'Lead id'));

  res.status(200).json({
    success: true,
    message: 'Lead fetched successfully',
    data: lead
  });
});

export const addLead = asyncHandler(async (req: Request, res: Response<ApiResponse<unknown>>) => {
  const lead = await createLead(req.body, req.user!._id.toString());

  res.status(201).json({
    success: true,
    message: 'Lead created successfully',
    data: lead
  });
});

export const editLead = asyncHandler(async (req: Request, res: Response<ApiResponse<unknown>>) => {
  const lead = await updateLead(requireStringParam(req.params.id, 'Lead id'), req.body);

  res.status(200).json({
    success: true,
    message: 'Lead updated successfully',
    data: lead
  });
});

export const removeLead = asyncHandler(async (req: Request, res: Response<ApiResponse<null>>) => {
  await deleteLead(requireStringParam(req.params.id, 'Lead id'));

  res.status(200).json({
    success: true,
    message: 'Lead deleted successfully',
    data: null
  });
});
