import type { HTMLAttributes, ReactNode } from 'react';

/**
 * 모달 헤더 컴포넌트.
 * @param {ReactNode} withIcon - 아이콘을 컴포넌트로 추가할 수 있는 선택적 요소.
 */
export default function ModalHeader({
  children,
  className,
  withIcon,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  withIcon?: ReactNode;
}) {
  return (
    <div className={`${className} flex flex-col items-center`} {...rest}>
      {withIcon}
      {children}
    </div>
  );
}
