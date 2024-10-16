import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import { ModalContext, useModalContextValue } from '../model/modal.context';

export type ModalRootProps = {
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
};

export default function ModalRoot({
  children,
  open,
  onOpenChange,
}: PropsWithChildren<ModalRootProps>) {
  const contextValue = useModalContextValue({ open, onOpenChange });
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}
