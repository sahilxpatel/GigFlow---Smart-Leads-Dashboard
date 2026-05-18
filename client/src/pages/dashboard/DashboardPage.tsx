import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { Table } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { fetchDashboardSummaryApi } from '../../api/dashboardApi';
import type { DashboardSummary } from '../../types/lead';
import { StatsGrid } from '../../components/leads/StatsGrid';
import { Skeleton } from '../../components/common/Skeleton';
import { getApiErrorMessage } from '../../api/http';

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await fetchDashboardSummaryApi();
      setSummary(data);
    } catch (fetchError) {
      const message = getApiErrorMessage(fetchError);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSummary();
  }, []);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.06),_transparent_35%),linear-gradient(135deg,_#ffffff,_#f8fafc)] p-6 shadow-soft lg:p-8 dark:border-slate-800 dark:bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.18),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(2,6,23,0.98))]">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-blue-300">Pipeline overview</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl dark:text-white">A clean view of lead health, activity, and conversion movement.</h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">Use the dashboard to monitor lead quality, recent capture activity, and the health of your pipeline at a glance.</p>
        </div>
      </section>

      <StatsGrid summary={summary ?? undefined} isLoading={isLoading} />

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent leads</h3>
            <p className="text-sm text-slate-400">Latest records captured in the system.</p>
          </div>
        </div>
        {error ? (
          <EmptyState
            title="Unable to load dashboard"
            description={error}
            action={
              <Button onClick={() => void loadSummary()}>
                Retry
              </Button>
            }
          />
        ) : isLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-950">
            <div className="divide-y divide-slate-800">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="grid gap-4 px-6 py-5 md:grid-cols-4">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        ) : summary?.recentLeads.length ? (
          <Table>
            <thead className="sticky top-0 z-10 bg-slate-900/95 text-xs uppercase tracking-[0.2em] text-slate-500 backdrop-blur">
              <tr>
                <th className="px-6 py-4">Lead</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {summary.recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/60">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{lead.name}</p>
                    <p className="text-xs text-slate-400">{lead.email}</p>
                  </td>
                  <td className="px-6 py-4"><Badge variant="status" tone={lead.status}>{lead.status}</Badge></td>
                  <td className="px-6 py-4"><Badge variant="source" tone={lead.source}>{lead.source}</Badge></td>
                  <td className="px-6 py-4 text-slate-300">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState title="No recent leads" description="Create leads to populate dashboard activity." />
        )}
      </section>
    </div>
  );
}
