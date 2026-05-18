import { Skeleton } from '../common/Skeleton';

export function StatsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-4 h-10 w-20" />
          <Skeleton className="mt-4 h-12 w-12 rounded-2xl" />
        </div>
      ))}
    </div>
  );
}
