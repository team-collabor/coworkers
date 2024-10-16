import type { HTMLAttributes } from 'react';

export default function ModalSummary({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  const defaultClassName =
    'whitespace-pre-line text-center text-md-medium text-secondary mt-2';
  return (
    <h2 className={`${defaultClassName} ${className}`} {...rest}>
      {children}
    </h2>
  );
}
