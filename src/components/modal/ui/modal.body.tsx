import { HTMLAttributes } from 'react';

export default function ModalBody({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}
