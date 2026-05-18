import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { Plus, Download } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { Pagination } from '../../components/common/Pagination';
import { LeadsFilters } from '../../components/leads/LeadsFilters';
import { LeadsTable } from '../../components/leads/LeadsTable';
import { LeadModal } from '../../components/leads/LeadModal';
import { LeadDetailsModal } from '../../components/leads/LeadDetailsModal';
import { exportLeadsToCsv } from '../../utils/csv';
import { useDebounce } from '../../hooks/useDebounce';
import { useLeadStore } from '../../store/leadStore';
import type { Lead } from '../../types/lead';
import type { LeadFormSchemaValues } from '../../utils/schemas';
import { getApiErrorMessage } from '../../api/http';
import { LeadsTableSkeleton } from '../../components/leads/LeadsTableSkeleton';

export function LeadsPage() {
  const { leads, filters, pagination, isLoading, error, setFilters, fetchLeads, createLead, updateLead, removeLead } = useLeadStore();
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [detailsLead, setDetailsLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search);
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    setFilters({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch, setFilters]);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads, filters.page, filters.sort, filters.source, filters.status, filters.search]);

  const handleEdit = (lead: Lead) => {
    setActiveLead(lead);
    setIsModalOpen(true);
  };

  const handleView = (lead: Lead) => {
    setDetailsLead(lead);
  };

  const handleCreate = () => {
    setActiveLead(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (lead: Lead) => {
    const confirmed = window.confirm(`Delete ${lead.name}?`);

    if (!confirmed) {
      return;
    }

    try {
      await removeLead(lead.id);
      toast.success('Lead deleted');
    } catch (deleteError) {
      toast.error(getApiErrorMessage(deleteError));
    }
  };

  const handleSubmit = async (values: LeadFormSchemaValues) => {
    try {
      if (activeLead) {
        await updateLead(activeLead.id, values);
        toast.success('Lead updated');
      } else {
        await createLead(values);
        toast.success('Lead created');
      }
      setIsModalOpen(false);
    } catch (submitError) {
      toast.error(getApiErrorMessage(submitError));
    }
  };

  const handleExport = () => {
    exportLeadsToCsv(leads);
    toast.success('CSV export generated');
  };

  let content: ReactNode;

  if (error) {
    content = <EmptyState title="Unable to load leads" description={error} action={<Button onClick={() => void fetchLeads()}>Retry</Button>} />;
  } else if (isLoading) {
    content = <LeadsTableSkeleton />;
  } else if (!leads.length) {
    const emptyDescription = filters.search || filters.status || filters.source
      ? 'No leads matched the current filters. Try broadening your search.'
      : 'Create the first lead to start filling your pipeline.';

    content = <EmptyState title="No leads found" description={emptyDescription} action={<Button onClick={handleCreate} leftIcon={<Plus className="h-4 w-4" />}>New lead</Button>} />;
  } else {
    content = <LeadsTable leads={leads} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft lg:flex-row lg:items-end lg:justify-between dark:border-slate-800 dark:bg-slate-950">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Leads</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Search, filter, sort, export, and manage your lead pipeline.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={handleExport} leftIcon={<Download className="h-4 w-4" />}>
            Export CSV
          </Button>
          <Button onClick={handleCreate} leftIcon={<Plus className="h-4 w-4" />}>
            New lead
          </Button>
        </div>
      </div>

      <LeadsFilters filters={filters} onChange={setFilters} searchValue={searchValue} onSearchValueChange={setSearchValue} />

      {content}

      <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={(page) => setFilters({ page })} />

      <LeadModal
        isOpen={isModalOpen}
        lead={activeLead}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <LeadDetailsModal isOpen={Boolean(detailsLead)} lead={detailsLead} onClose={() => setDetailsLead(null)} />
    </div>
  );
}
