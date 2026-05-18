import { LayoutDashboard, LogOut, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '../common/Button';
import { authStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { cn } from '../../utils/cn';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/leads', label: 'Leads', icon: Users }
];

export function Sidebar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const logout = authStore((state) => state.logout);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white/95 px-4 py-6 backdrop-blur-xl transition-transform lg:static lg:translate-x-0 dark:border-slate-800 dark:bg-slate-950/95',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      <div className="mb-8 flex items-center justify-between gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-300">SL</div>
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">Smart Leads</p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">Dashboard</p>
        </div>
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={closeSidebar} aria-label="Close sidebar">
          <span className="text-lg leading-none">×</span>
        </Button>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                )
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-sm font-medium text-white">Need quick access?</p>
        <p className="mt-1 text-xs text-slate-400">Keep your lead workflow organized and exportable.</p>
      </div>

      <div className="absolute bottom-6 left-4 right-4">
        <Button variant="secondary" className="w-full justify-start" leftIcon={<LogOut className="h-4 w-4" />} onClick={() => { closeSidebar(); logout(); }}>
          Sign out
        </Button>
      </div>
    </aside>
  );
}
