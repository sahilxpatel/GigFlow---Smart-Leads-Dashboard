import type { ReactNode } from 'react';
import { MoonStar, SunMedium } from 'lucide-react';
import { Button } from '../common/Button';
import { useUiStore } from '../../store/uiStore';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const theme = useUiStore((s) => s.theme);
  const toggleTheme = useUiStore((s) => s.toggleTheme);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_40%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] px-4 py-10 text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.3),_transparent_40%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] dark:text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft md:grid-cols-2 dark:border-slate-800 dark:bg-slate-950">
          <div className="hidden flex-col justify-between border-r border-slate-200 bg-white/50 p-10 md:flex dark:border-slate-800 dark:bg-slate-900/50">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Smart Leads Dashboard</p>
              <h1 className="mt-4 max-w-md text-4xl font-semibold leading-tight text-slate-900 dark:text-white">A modern lead management workspace for sales teams.</h1>
            </div>
            <p className="max-w-md text-sm text-slate-700 dark:text-slate-400">Track leads, segment sources, manage pipeline health, and export clean reports from a production-ready dashboard.</p>
          </div>
          <div className="p-6 md:p-10">
            <div className="mb-6 flex justify-end">
              <Button variant="secondary" size="sm" onClick={toggleTheme} leftIcon={theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}>
                {theme === 'dark' ? 'Light' : 'Dark'}
              </Button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
