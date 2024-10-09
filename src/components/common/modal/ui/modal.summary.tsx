import type { ReactNode } from 'react';

function ModalSummary({ children }: { children: ReactNode }) {
  return (
    <div
      className={`
      text-md-medium text-default 
      whitespace-pre-line text-center
    `}
    >
      {children}
    </div>
  );
}

export default ModalSummary;
