import { create } from 'zustand';

export type TAsideStore = {
  openState: boolean;
  toggle: () => void;
};

export const useAsideStore = create<TAsideStore>()((set) => ({
  openState: false,
  toggle: () => set((state) => ({ openState: !state.openState })),
}));
