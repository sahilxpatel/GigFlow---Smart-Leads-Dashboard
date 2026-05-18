import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn('overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-950', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700 dark:divide-slate-800 dark:text-slate-300">{children}</table>
      </div>
    </div>
  );
}
