import { useContextSelector } from '@/hooks/context/use-context-selector';
import { TResponse } from '@/types/base.types';
import { TMemberships } from '@/types/membership.types';
import { TUser } from '@/types/user.types';
import { Context, createContext } from 'react';

type TLayoutContext = {
  user: TResponse<TUser> | undefined;
  memberships: TResponse<TMemberships> | undefined;
};

export const LayoutContext = createContext<undefined | TLayoutContext>(
  undefined
);

export const useLayoutContext = () =>
  useContextSelector(LayoutContext as Context<TLayoutContext>);
