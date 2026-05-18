import { Skeleton } from '../common/Skeleton';

export function LeadsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-950">
      <div className="overflow-x-auto">
        <table className="min-w-[960px] w-full text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="sticky top-0 z-10 bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-900">
            <tr>
              <th className="px-6 py-4">Lead</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Created By</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="mt-3 h-3 w-48" />
                </td>
                <td className="px-6 py-4"><Skeleton className="h-7 w-24 rounded-full" /></td>
                <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-20 rounded-xl" />
                    <Skeleton className="h-9 w-20 rounded-xl" />
                    <Skeleton className="h-9 w-20 rounded-xl" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
