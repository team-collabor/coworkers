import { createContext } from 'react';
import { TGroups } from './types';

export type TLayoutContext = {
  data?: TGroups;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export const LayoutContext = createContext<TLayoutContext | undefined>(
  undefined
);
