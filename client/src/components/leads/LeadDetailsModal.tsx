import { CalendarDays, Mail, UserCircle2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import type { Lead } from '../../types/lead';

interface LeadDetailsModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

export function LeadDetailsModal({ isOpen, lead, onClose }: LeadDetailsModalProps) {
  if (!lead) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} title="Lead Details" description="Review the complete lead profile and ownership information." onClose={onClose}>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/60 p-5 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Lead profile</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{lead.name}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-950 px-3 py-1">
                  <Mail className="h-4 w-4" />
                  {lead.email}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-950 px-3 py-1">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(lead.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="status" tone={lead.status}>{lead.status}</Badge>
              <Badge variant="source" tone={lead.source}>{lead.source}</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm text-slate-600 dark:text-slate-400">Created by</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                <UserCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{lead.createdBy.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{lead.createdBy.email}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm text-slate-600 dark:text-slate-400">Owner role</p>
            <div className="mt-3">
              <Badge variant="role" tone={lead.createdBy.role}>{lead.createdBy.role === 'admin' ? 'Admin' : 'Sales'}</Badge>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
