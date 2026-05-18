import { Eye, Edit3, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Table } from '../common/Table';
import type { Lead } from '../../types/lead';
import { authStore } from '../../store/authStore';

interface LeadsTableProps {
  leads: Lead[];
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export function LeadsTable({ leads, onView, onEdit, onDelete }: LeadsTableProps) {
  const role = authStore((state) => state.user?.role);
  const canDelete = role === 'admin';

  return (
    <Table>
      <thead className="sticky top-0 z-10 bg-slate-900/95 text-xs uppercase tracking-[0.2em] text-slate-500 backdrop-blur">
        <tr>
          <th className="px-6 py-4">Lead</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4">Source</th>
          <th className="px-6 py-4">Created By</th>
          <th className="px-6 py-4">Created At</th>
          <th className="px-6 py-4">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800">
        {leads.map((lead) => (
          <tr key={lead.id} className="transition-colors hover:bg-slate-900/60">
            <td className="px-6 py-4">
              <p className="font-medium text-white">{lead.name}</p>
              <p className="text-xs text-slate-400">{lead.email}</p>
            </td>
            <td className="px-6 py-4"><Badge variant="status" tone={lead.status}>{lead.status}</Badge></td>
            <td className="px-6 py-4"><Badge variant="source" tone={lead.source}>{lead.source}</Badge></td>
            <td className="px-6 py-4 text-slate-300">{lead.createdBy.name}</td>
            <td className="px-6 py-4 text-slate-300">{new Date(lead.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" onClick={() => onView(lead)} leftIcon={<Eye className="h-4 w-4" />}>
                  View
                </Button>
                <Button variant="secondary" size="sm" onClick={() => onEdit(lead)} leftIcon={<Edit3 className="h-4 w-4" />}>
                  Edit
                </Button>
                {canDelete ? (
                  <Button variant="danger" size="sm" onClick={() => onDelete(lead)} leftIcon={<Trash2 className="h-4 w-4" />}>
                    Delete
                  </Button>
                ) : null}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
