import { User } from '@/types/auth.types';
import { UseQueryResult } from '@tanstack/react-query';
import { createContext } from 'react';
import { TGroups } from './types';

export type TLayoutContext = {
  groups: UseQueryResult<TGroups, Error>;
  user: User;
};

export const LayoutContext = createContext<TLayoutContext | undefined>(
  undefined
);
