import type { Lead } from '../types/lead';

function escapeCsvValue(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}

export function exportLeadsToCsv(leads: Lead[]): void {
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    lead.createdAt,
    lead.createdBy.name
  ]);

  const csv = [
    ['Name', 'Email', 'Status', 'Source', 'Created At', 'Created By'],
    ...rows
  ]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
}
