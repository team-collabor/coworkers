import type { ReactNode } from 'react';

function ModalSummary({ children }: { children: ReactNode }) {
  return (
    // eslint-disable-next-line max-len
    <div className="whitespace-pre-line text-center text-md-medium text-default">
      {children}
    </div>
  );
}

export default ModalSummary;
