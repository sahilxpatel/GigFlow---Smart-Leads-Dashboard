import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, AuthUser } from '../types/auth';
import { fetchMeApi, loginApi, registerApi } from '../api/authApi';
import type { LoginFormValues, RegisterFormValues } from '../utils/schemas';

interface AuthActions {
  login: (payload: LoginFormValues) => Promise<void>;
  register: (payload: RegisterFormValues) => Promise<void>;
  bootstrap: () => Promise<void>;
  logout: () => void;
}

interface AuthHydrationState {
  isHydrated: boolean;
}

export const authStore = create<AuthState & AuthHydrationState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,
      login: async (payload) => {
        const response = await loginApi(payload);
        set({ user: response.user, token: response.token, isAuthenticated: true });
      },
      register: async (payload) => {
        const response = await registerApi(payload);
        set({ user: response.user, token: response.token, isAuthenticated: true });
      },
      bootstrap: async () => {
        if (!get().token) {
          return;
        }

        try {
          const user = await fetchMeApi();
          set({ user, isAuthenticated: true });
        } catch {
          set({ user: null, token: null, isAuthenticated: false });
        }
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false })
    }),
    {
      name: 'smart-leads-auth',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
          state.isAuthenticated = Boolean(state.token);
        }
      }
    }
  )
);

export function setAuthSession(user: AuthUser, token: string): void {
  authStore.setState({ user, token, isAuthenticated: true });
}
