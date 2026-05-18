export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  lostLeads: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  recentLeads: Array<{
    id: string;
    name: string;
    email: string;
    status: string;
    source: string;
    createdAt: Date;
  }>;
}
