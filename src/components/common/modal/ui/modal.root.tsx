import { type ReactNode, useMemo } from 'react';

import { ModalContext } from '../model/Modal.context';
import { useModalStore } from '../model/Modal.store';

export function ModalRoot({
  children,
  id,
}: {
  children?: ReactNode;
  id: string;
}) {
  const { modals, add, del } = useModalStore();
  const isClosed = !modals.includes(id) || false;
  const contextValue = useMemo(
    () => ({
      isClosed,
      addModal: () => add(id),
      delModal: () => del(id),
    }),
    [id, isClosed, add, del]
  );
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalRoot;
