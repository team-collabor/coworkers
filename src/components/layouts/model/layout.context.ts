import { createContext } from 'react';

export type TLayoutContext = {
  groups: [];
};

export const LayoutContext = createContext<TLayoutContext | undefined>(
  undefined
);
