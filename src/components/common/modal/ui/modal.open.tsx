import type { ReactNode } from 'react';

import { useModalContext } from '../model/Modal.context';

function ModalOpen({ children }: { children?: ReactNode }) {
  const { addModal } = useModalContext();
  return (
    <button type="button" onClick={() => addModal()}>
      {children}
    </button>
  );
}

export default ModalOpen;
