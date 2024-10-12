import { PropsWithChildren } from 'react';

export default function LayoutProvider({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}
