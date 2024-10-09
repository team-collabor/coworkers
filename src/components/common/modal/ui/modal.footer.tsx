import type { ReactNode } from 'react';

function ModalFooter({ children }: { children?: ReactNode }) {
  return <div className="grid auto-cols-fr grid-flow-col">{children}</div>;
}

export default ModalFooter;
