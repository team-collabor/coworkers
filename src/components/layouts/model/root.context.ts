import { useContextSelector } from '@/hooks/context/use-context-selector';
import { TResponse } from '@/types/base.types';
import { TMemberships } from '@/types/membership.types';
import { TUser } from '@/types/user.types';
import { Context, createContext } from 'react';

type TRootContext = {
  user: {
    data: TResponse<TUser> | undefined;
    loading: boolean;
  };
  memberships: {
    data: TResponse<TMemberships> | undefined;
    loading: boolean;
  };
};

export const RootContext = createContext<undefined | TRootContext>(undefined);

export const useRootContext = () =>
  useContextSelector(RootContext as Context<TRootContext>);
