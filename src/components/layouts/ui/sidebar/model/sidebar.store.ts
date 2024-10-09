import { create } from 'zustand';

export type SidebarStoreState = {
  isClosed: boolean;
};

export type SidebarStoreActions = {
  toggle: () => void;
  close: () => void;
};

export type SidebarStore = SidebarStoreState & SidebarStoreActions;

export const useSidebarStore = create<SidebarStore>()((set) => ({
  isClosed: true,
  toggle: () => set((state) => ({ isClosed: !state.isClosed })),
  close: () => set(() => ({ isClosed: true })),
}));
