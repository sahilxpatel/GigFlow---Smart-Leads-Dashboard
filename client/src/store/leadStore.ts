import { create } from 'zustand';
import type { Lead, LeadFilters, LeadFormValues } from '../types/lead';
import { createLeadApi, deleteLeadApi, fetchLeadsApi, updateLeadApi } from '../api/leadsApi';
import type { PaginationMeta } from '../types/api';

interface LeadState {
  leads: Lead[];
  pagination: PaginationMeta;
  filters: LeadFilters;
  isLoading: boolean;
  error: string | null;
}

interface LeadActions {
  setFilters: (partial: Partial<LeadFilters>) => void;
  resetFilters: () => void;
  fetchLeads: () => Promise<void>;
  createLead: (payload: LeadFormValues) => Promise<void>;
  updateLead: (id: string, payload: LeadFormValues) => Promise<void>;
  removeLead: (id: string) => Promise<void>;
}

const defaultFilters: LeadFilters = {
  status: '',
  source: '',
  search: '',
  sort: 'latest',
  page: 1
};

export const useLeadStore = create<LeadState & LeadActions>((set, get) => ({
  leads: [],
  pagination: {
    page: 1,
    totalPages: 1,
    totalRecords: 0
  },
  filters: defaultFilters,
  isLoading: false,
  error: null,
  setFilters: (partial) => set({ filters: { ...get().filters, ...partial } }),
  resetFilters: () => set({ filters: defaultFilters }),
  fetchLeads: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetchLeadsApi(get().filters);
      set({ leads: response.data, pagination: response.pagination, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch leads', isLoading: false });
    }
  },
  createLead: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      await createLeadApi(payload);
      await get().fetchLeads();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create lead', isLoading: false });
      throw error;
    }
  },
  updateLead: async (id, payload) => {
    set({ isLoading: true, error: null });

    try {
      await updateLeadApi(id, payload);
      await get().fetchLeads();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update lead', isLoading: false });
      throw error;
    }
  },
  removeLead: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await deleteLeadApi(id);
      await get().fetchLeads();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete lead', isLoading: false });
      throw error;
    }
  }
}));
