import { Types } from 'mongoose';
import { Lead } from '../models/Lead.js';
import { AppError } from '../utils/appError.js';
import { getPagination } from '../utils/pagination.js';
import type { LeadFilterQuery, LeadSource, LeadStatus, LeadListItem } from '../interfaces/lead.js';
import type { LeadInput } from '../validators/leadValidators.js';
import type { AuthUser } from '../interfaces/user.js';

function mapLeadDocument(lead: {
  _id: Types.ObjectId;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
  createdBy: { _id: Types.ObjectId; name: string; email: string; role: AuthUser['role'] };
}): LeadListItem {
  return {
    id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    createdAt: lead.createdAt,
    createdBy: {
      id: lead.createdBy._id.toString(),
      name: lead.createdBy.name,
      email: lead.createdBy.email,
      role: lead.createdBy.role
    }
  };
}

export async function createLead(input: LeadInput, createdById: string) {
  const lead = await Lead.create({
    ...input,
    createdBy: new Types.ObjectId(createdById)
  });

  return lead;
}

export async function getLeadById(leadId: string) {
  const lead = await Lead.findById(leadId).populate('createdBy', 'name email role');

  if (!lead) {
    throw new AppError('Lead not found', 404);
  }

  return mapLeadDocument(lead.toObject() as never);
}

export async function updateLead(leadId: string, input: LeadInput) {
  const lead = await Lead.findByIdAndUpdate(leadId, input, { new: true }).populate('createdBy', 'name email role');

  if (!lead) {
    throw new AppError('Lead not found', 404);
  }

  return mapLeadDocument(lead.toObject() as never);
}

export async function deleteLead(leadId: string) {
  const lead = await Lead.findByIdAndDelete(leadId);

  if (!lead) {
    throw new AppError('Lead not found', 404);
  }
}

export async function listLeads(filters: LeadFilterQuery) {
  const { page, limit, skip } = getPagination(filters.page, 10);
  const query: Record<string, unknown> = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.source) {
    query.source = filters.source;
  }

  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { email: { $regex: filters.search, $options: 'i' } }
    ];
  }

  const sortDirection: 1 | -1 = filters.sort === 'oldest' ? 1 : -1;
  const [totalRecords, leads] = await Promise.all([
    Lead.countDocuments(query),
    Lead.find(query)
      .sort({ createdAt: sortDirection })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email role')
  ]);

  const totalPages = Math.max(1, Math.ceil(totalRecords / limit));

  return {
    data: leads.map((lead) => mapLeadDocument(lead.toObject() as never)),
    pagination: {
      page,
      totalPages,
      totalRecords
    }
  };
}
