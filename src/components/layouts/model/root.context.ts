import { TGetUser } from '@/apis/user/get-user';
import { useContextSelector } from '@/hooks/context/use-context-selector';
import { TError } from '@/types/common';
import { TMemberships } from '@/types/user';
import { Context, createContext } from 'react';

type TRootContext = {
  user: {
    data?: TGetUser;
    error?: TError;
    loading: boolean;
  };
  memberships: {
    data?: TMemberships;
    error?: TError;
    loading: boolean;
  };
};

export const RootContext = createContext<undefined | TRootContext>(undefined);

export const useRootContext = () =>
  useContextSelector(RootContext as Context<TRootContext>);
