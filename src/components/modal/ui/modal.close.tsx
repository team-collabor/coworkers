import { ReactNode } from 'react';
import { useModalContext } from '../model/modal.context';

export default function ModalClose({ children }: { children?: ReactNode }) {
  const { toggle } = useModalContext();
  return <div onClick={() => toggle()}>{children}</div>;
}
