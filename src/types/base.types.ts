export type TBaseDate = {
  updatedAt: string;
  createdAt: string;
};

export type TError = {
  status: string;
  message: string;
};

export type TResponse<TData> = {
  data?: TData;
  error?: TError;
};

export type TBaseApiQuery = {
  path: string;
  config?: object;
};
