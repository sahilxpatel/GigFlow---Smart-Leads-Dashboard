import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { cn } from '../../utils/cn';
import { useUiStore } from '../../store/uiStore';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

  return (
    <div className={cn('min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 lg:flex', sidebarOpen && 'overflow-hidden')}>
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-white/60 backdrop-blur-sm lg:hidden dark:bg-slate-950/60"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <Navbar />
        <main className="flex-1 px-4 py-6 lg:px-6">{children}</main>
      </div>
    </div>
  );
}
