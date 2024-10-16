import { TError } from './error';

export type TResponse<TData> = {
  data?: TData;
  error?: TError;
};
