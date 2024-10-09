import type { ReactNode } from 'react';

import { useModalContext } from '../model/modal.context';

function ModalClose({ children }: { children?: ReactNode }) {
  const { delModal } = useModalContext();
  return (
    <button type="button" onClick={() => delModal()}>
      {children}
    </button>
  );
}

export default ModalClose;
