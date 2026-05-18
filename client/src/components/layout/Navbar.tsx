import { Menu, MoonStar, SunMedium } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { authStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';

export function Navbar() {
  const user = authStore((state) => state.user);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur lg:px-6 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back</p>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{user?.name ?? 'User'}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {user ? <Badge variant="role" tone={user.role}>{user.role === 'admin' ? 'Admin' : 'Sales'}</Badge> : null}
        <Button variant="secondary" size="sm" onClick={toggleTheme} leftIcon={theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </Button>
      </div>
    </header>
  );
}
