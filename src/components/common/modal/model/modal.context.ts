import { useContextSelector } from '@/hooks/context/use-context-selector';
import { createContext } from 'react';

export type TModalContext = {
  isClosed: boolean;
  addModal: () => void;
  delModal: () => void;
};

export const ModalContext = createContext<TModalContext>({
  isClosed: true,
  addModal: () => {},
  delModal: () => {},
});

export const useModalContext = () => useContextSelector(ModalContext);
