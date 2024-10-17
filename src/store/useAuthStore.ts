import { AuthTokens } from '@/types/auth.types';
import { User } from '@/types/users.types';
import { create } from 'zustand';
import { combine, createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type AuthState = {
  user: User | null;
} & AuthTokens;

export type AuthActions = {
  setUser: (user: User) => void;
  setAccessToken: (accessToken: AuthTokens['accessToken']) => void;
  setRefreshToken: (refreshToken: AuthTokens['refreshToken']) => void;
  clearAuth: () => void;
  clearTokens: () => void;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const useAuthStore = create(
  persist(
    immer(
      combine(initialState, (set) => ({
        setUser: (user: User | null) => {
          set((state) => {
            state.user = user;
          });
        },
        setAccessToken: (accessToken: AuthTokens['accessToken']) => {
          set((state) => {
            state.accessToken = accessToken;
          });
        },
        setRefreshToken: (refreshToken: AuthTokens['refreshToken']) => {
          set((state) => {
            state.refreshToken = refreshToken;
          });
        },
        clearAuth: () => {
          set((state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
          });
        },
        clearTokens: () => {
          set((state) => {
            state.accessToken = null;
            state.refreshToken = null;
          });
        },
      }))
    ),
    {
      name: 'authStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
