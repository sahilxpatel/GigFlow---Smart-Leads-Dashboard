import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1} leftIcon={<ChevronLeft className="h-4 w-4" />}>
          Prev
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages} rightIcon={<ChevronRight className="h-4 w-4" />}>
          Next
        </Button>
      </div>
    </div>
  );
}
