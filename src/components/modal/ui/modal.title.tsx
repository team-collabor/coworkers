import type { HTMLAttributes } from 'react';

export default function ModalTitle({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  const defaultClassName = 'text-lg-medium text-primary';
  return (
    <h1 className={`${defaultClassName} ${className}`} {...rest}>
      {children}
    </h1>
  );
}
