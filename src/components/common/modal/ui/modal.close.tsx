import type { ReactNode } from 'react';

import { useModalContext } from '../model/Modal.context';

function ModalClose({ children }: { children?: ReactNode }) {
  const { delModal } = useModalContext();
  return (
    <button type="button" onClick={() => delModal()}>
      {children}
    </button>
  );
}

export default ModalClose;
