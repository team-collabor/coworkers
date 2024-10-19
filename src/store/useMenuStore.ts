import { findHook } from '@/components/layouts/lib/use-find-hook';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  hooks: string[];
};

type Actions = {
  toggle: (hook: string) => void;
  close: () => void;
};

const getColons = (hook: string) => hook.match(/:/g) || [];

export const useMenuStore = create<State & Actions>()(
  immer((set) => ({
    hooks: [],
    toggle: (input: string) =>
      set((state) => {
        const hooksSize = state.hooks.length;
        const currentHookColonCount = getColons(input).length;
        const foundHook = findHook(state.hooks, input);
        const maxColonCountInHooks = state.hooks.reduce(
          (max, val) => Math.max(max, getColons(val).length),
          0
        );
        if (!currentHookColonCount) {
          if (hooksSize) {
            if (foundHook) {
              state.hooks = state.hooks.filter((val) => val !== foundHook);
            } else {
              state.hooks = [input];
            }
          } else {
            state.hooks.push(input);
          }
        } else if (currentHookColonCount > maxColonCountInHooks) {
          state.hooks.push(input);
        } else if (currentHookColonCount === maxColonCountInHooks) {
          if (foundHook) {
            state.hooks = state.hooks.filter((val) => val !== foundHook);
          } else {
            const filteredHooks = state.hooks.filter(
              (val) => getColons(val).length < currentHookColonCount
            );
            state.hooks = [...filteredHooks, input];
          }
        } else {
          state.hooks = [];
        }
      }),
    close: () =>
      set((state) => {
        state.hooks = [];
      }),
  }))
);
