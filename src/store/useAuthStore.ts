import { AuthTokens } from '@/types/auth.types';
import { Membership, User } from '@/types/users.types';
import { create } from 'zustand';
import { combine, createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type AuthState = {
  user: User | null;
  memberships: Membership[];
} & AuthTokens;

export type AuthActions = {
  setUser: (user: User) => void;
  setMemberships: (memberships: Membership[]) => void;
  setAccessToken: (accessToken: AuthTokens['accessToken']) => void;
  setRefreshToken: (refreshToken: AuthTokens['refreshToken']) => void;
  clearAuth: () => void;
  clearTokens: () => void;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  memberships: [],
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
        setMemberships: (memberships: Membership[]) => {
          set((state) => {
            state.memberships = memberships;
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
            state.memberships = [];
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
