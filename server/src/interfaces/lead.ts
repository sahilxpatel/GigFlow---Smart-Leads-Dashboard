import type { HydratedDocument, Types } from 'mongoose';
import type { AuthUser } from './user.js';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface ILead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadFilterQuery {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
}

export interface LeadListItem {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
  createdBy: Pick<AuthUser, 'id' | 'name' | 'email' | 'role'>;
}

export type ILeadDocument = HydratedDocument<ILead> & { _id: Types.ObjectId };
