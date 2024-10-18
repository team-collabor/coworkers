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

export const useDropStore = create<State & Actions>()(
  immer((set) => ({
    hooks: [],
    toggle: (hook: string) =>
      set((state) => {
        const size = state.hooks.length;
        const colonIndex = (hook.match(/:/g) || []).length;
        const isColon = colonIndex > 0;
        if (size === 0) {
          state.hooks.push(hook);
        } else if (isColon && colonIndex < size) {
          if (state.hooks.includes(hook)) {
            state.hooks = state.hooks.filter((val) => val !== hook);
          } else {
            state.hooks = [
              ...state.hooks.filter((val) => !val.match(/:/g)),
              hook,
            ];
          }
        } else if (findHook(state.hooks, hook)) {
          state.hooks = state.hooks.filter((val) => val !== hook);
        } else if (isColon && colonIndex === size) {
          state.hooks.push(hook);
        } else {
          state.hooks = [hook];
        }
      }),
    close: () =>
      set((state) => {
        state.hooks = [];
      }),
  }))
);
