import { Outlet } from 'react-router-dom';
import { DashboardShell } from '../components/layout/DashboardShell';

export function AppLayout() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}
