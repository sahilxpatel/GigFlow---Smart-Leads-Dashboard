import type { LucideIcon } from 'lucide-react';
import { BadgeCheck, CircleAlert, Sparkles, Users } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import type { DashboardSummary } from '../../types/lead';
import { StatsGridSkeleton } from './StatsGridSkeleton';

interface StatsGridProps {
  summary?: DashboardSummary | undefined;
  isLoading?: boolean;
}

const statCards = [
  {
    key: 'totalLeads',
    title: 'Total Leads',
    icon: Users,
    accentClassName: 'bg-gradient-to-br from-blue-600 to-cyan-500'
  },
  {
    key: 'newLeads',
    title: 'New Leads',
    icon: Sparkles,
    accentClassName: 'bg-gradient-to-br from-sky-600 to-blue-500'
  },
  {
    key: 'qualifiedLeads',
    title: 'Qualified Leads',
    icon: BadgeCheck,
    accentClassName: 'bg-gradient-to-br from-emerald-600 to-green-500'
  },
  {
    key: 'lostLeads',
    title: 'Lost Leads',
    icon: CircleAlert,
    accentClassName: 'bg-gradient-to-br from-rose-600 to-pink-500'
  }
] as const satisfies ReadonlyArray<{
  key: keyof DashboardSummary['stats'];
  title: string;
  icon: LucideIcon;
  accentClassName: string;
}>;

export function StatsGrid({ summary, isLoading = false }: StatsGridProps) {
  const stats = summary?.stats;

  if (isLoading) {
    return <StatsGridSkeleton />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => {
        const Icon = card.icon;

        return (
          <StatCard
            key={card.key}
            title={card.title}
            value={stats?.[card.key] ?? 0}
            icon={Icon}
            accentClassName={card.accentClassName}
          />
        );
      })}
    </div>
  );
}
