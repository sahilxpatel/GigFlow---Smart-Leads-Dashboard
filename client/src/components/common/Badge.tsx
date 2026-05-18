import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'status' | 'source' | 'role';
type BadgeTone = 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Website' | 'Instagram' | 'Referral' | 'admin' | 'sales';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  tone: BadgeTone;
  className?: string;
}

const badgeStyles: Record<BadgeVariant, Record<BadgeTone, string>> = {
  status: {
    New: 'bg-sky-500/15 text-sky-300 ring-sky-500/25',
    Contacted: 'bg-amber-500/15 text-amber-300 ring-amber-500/25',
    Qualified: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/25',
    Lost: 'bg-rose-500/15 text-rose-300 ring-rose-500/25',
    Website: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Instagram: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Referral: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    admin: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    sales: 'bg-slate-500/15 text-slate-300 ring-slate-500/25'
  },
  source: {
    New: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Contacted: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Qualified: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Lost: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Website: 'bg-cyan-500/15 text-cyan-300 ring-cyan-500/25',
    Instagram: 'bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-500/25',
    Referral: 'bg-indigo-500/15 text-indigo-300 ring-indigo-500/25',
    admin: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    sales: 'bg-slate-500/15 text-slate-300 ring-slate-500/25'
  },
  role: {
    New: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Contacted: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Qualified: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Lost: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Website: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Instagram: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    Referral: 'bg-slate-500/15 text-slate-300 ring-slate-500/25',
    admin: 'bg-blue-500/15 text-blue-300 ring-blue-500/25',
    sales: 'bg-slate-500/15 text-slate-300 ring-slate-500/25'
  }
};

export function Badge({ children, variant = 'status', tone, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset', badgeStyles[variant][tone], className)}>
      {children}
    </span>
  );
}
