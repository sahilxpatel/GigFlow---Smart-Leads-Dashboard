import { useEffect } from 'react';
import { AppRouter } from './routes/AppRouter';
import { authStore } from './store/authStore';
import { useUiStore } from './store/uiStore';

export function App() {
  const bootstrap = authStore((state) => state.bootstrap);
  const theme = useUiStore((state) => state.theme);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return <AppRouter />;
}
