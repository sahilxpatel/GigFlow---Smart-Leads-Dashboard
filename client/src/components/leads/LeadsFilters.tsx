import { SearchBar } from '../common/SearchBar';
import { Select } from '../common/Select';
import type { LeadFilters } from '../../types/lead';

interface LeadsFiltersProps {
  filters: LeadFilters;
  onChange: (partial: Partial<LeadFilters>) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
}

export function LeadsFilters({ filters, onChange, searchValue, onSearchValueChange }: LeadsFiltersProps) {
  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft xl:grid-cols-4 dark:border-slate-800 dark:bg-slate-950">
      <SearchBar value={searchValue} onChange={onSearchValueChange} />
      <Select
        label="Status"
        value={filters.status}
        onChange={(event) => onChange({ status: event.target.value as LeadFilters['status'], page: 1 })}
        options={[
          { label: 'All statuses', value: '' },
          { label: 'New', value: 'New' },
          { label: 'Contacted', value: 'Contacted' },
          { label: 'Qualified', value: 'Qualified' },
          { label: 'Lost', value: 'Lost' }
        ]}
      />
      <Select
        label="Source"
        value={filters.source}
        onChange={(event) => onChange({ source: event.target.value as LeadFilters['source'], page: 1 })}
        options={[
          { label: 'All sources', value: '' },
          { label: 'Website', value: 'Website' },
          { label: 'Instagram', value: 'Instagram' },
          { label: 'Referral', value: 'Referral' }
        ]}
      />
      <Select
        label="Sort"
        value={filters.sort}
        onChange={(event) => onChange({ sort: event.target.value as LeadFilters['sort'], page: 1 })}
        options={[
          { label: 'Latest', value: 'latest' },
          { label: 'Oldest', value: 'oldest' }
        ]}
      />
    </div>
  );
}
