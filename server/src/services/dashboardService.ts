import { Lead } from '../models/Lead.js';
import type { DashboardResponse } from '../interfaces/dashboard.js';

export async function getDashboardSummary(): Promise<DashboardResponse> {
  const [totalLeads, newLeads, contactedLeads, qualifiedLeads, lostLeads, recentLeads] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'New' }),
    Lead.countDocuments({ status: 'Contacted' }),
    Lead.countDocuments({ status: 'Qualified' }),
    Lead.countDocuments({ status: 'Lost' }),
    Lead.find().sort({ createdAt: -1 }).limit(5).select('name email status source createdAt')
  ]);

  return {
    stats: {
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      lostLeads
    },
    recentLeads: recentLeads.map((lead) => ({
      id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
      createdAt: lead.createdAt
    }))
  };
}
