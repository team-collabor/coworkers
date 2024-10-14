import { type Context, useContext } from 'react';

export const useContextSelector = <T>(Context: Context<T>): T => {
  const context = useContext<T>(Context);
  if (!context) {
    throw new Error('모달 컨텍스트는 프로바이더 내부에서 사용되어야 합니다.');
  }
  return context;
};
