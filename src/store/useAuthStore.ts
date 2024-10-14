import { User } from '@/types/auth.types';
import { CommonTypes } from '@/types/common.types';
import { NullablePick } from '@/utils/utilityTypes/NullablePick';
import { create } from 'zustand';
import {
  combine,
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type AuthState = {
  user: User;
} & NullablePick<CommonTypes, 'accessToken' | 'refreshToken'>;

export type AuthActions = {
  setUser: (user: User) => void;
  setAccessToken: (accessToken: Pick<CommonTypes, 'accessToken'>) => void;
  setRefreshToken: (refreshToken: Pick<CommonTypes, 'refreshToken'>) => void;
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
    subscribeWithSelector(
      immer(
        combine(initialState, (set) => ({
          setUser: (user: User | null) => {
            set((state) => {
              state.user = user;
            });
          },
          setAccessToken: (accessToken: CommonTypes['accessToken']) => {
            set((state) => {
              state.accessToken = accessToken;
            });
          },
          setRefreshToken: (refreshToken: CommonTypes['refreshToken']) => {
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
      )
    ),
    {
      name: 'authStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
