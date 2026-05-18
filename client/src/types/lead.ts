export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'sales';
  };
}

export interface LeadFormValues {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface LeadFilters {
  status: LeadStatus | '';
  source: LeadSource | '';
  search: string;
  sort: 'latest' | 'oldest';
  page: number;
}

export interface DashboardSummary {
  stats: {
    totalLeads: number;
    newLeads: number;
    contactedLeads: number;
    qualifiedLeads: number;
    lostLeads: number;
  };
  recentLeads: Array<Pick<Lead, 'id' | 'name' | 'email' | 'status' | 'source' | 'createdAt'>>;
}
