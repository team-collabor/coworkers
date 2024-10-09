import { create } from 'zustand';

export type ModalStoreState = {
  modals: string[];
};

export type ModalStoreActions = {
  add: (modalId: string) => void;
  del: (modalId: string) => void;
};

export type ModalStore = ModalStoreState & ModalStoreActions;

export const useModalStore = create<ModalStore>()((set) => ({
  modals: [],
  add: (id) =>
    set((state) => ({
      modals: state.modals.includes(id) ? state.modals : [...state.modals, id],
    })),
  del: (id) =>
    set((state) => ({
      modals: state.modals.filter((modalId) => modalId !== id),
    })),
}));
