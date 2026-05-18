import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  accentClassName: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, accentClassName }: StatCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:bg-slate-900/80">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</p>
          {subtitle ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">{subtitle}</p> : null}
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform group-hover:scale-105', accentClassName)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
