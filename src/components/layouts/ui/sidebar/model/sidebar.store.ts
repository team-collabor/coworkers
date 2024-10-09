import { create } from 'zustand';

export type SidebarStoreState = {
  isClosed: boolean;
};

export type SidebarStoreActions = {
  toggle: () => void;
  close: () => void;
};

export type TSidebarStore = SidebarStoreState & SidebarStoreActions;

export const SidebarStore = create<TSidebarStore>()((set) => ({
  isClosed: true,
  toggle: () => set((state) => ({ isClosed: !state.isClosed })),
  close: () => set(() => ({ isClosed: true })),
}));
