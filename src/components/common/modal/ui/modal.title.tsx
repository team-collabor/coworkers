import type { ReactNode } from 'react';

function ModalTitle({
  children,
  iconComponent,
}: {
  children?: ReactNode;
  iconComponent?: ReactNode;
}) {
  return (
    <div
      className={`
      grid grid-flow-row auto-rows-auto justify-items-center gap-y-4 text-center
    `}
    >
      {iconComponent}
      {children}
    </div>
  );
}

export default ModalTitle;
