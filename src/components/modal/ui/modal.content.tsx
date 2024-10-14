import { UnoptimizedImage } from '@/components/next';
import { HTMLAttributes } from 'react';
import ModalToggle from './modal.toggle';

/**
 * 모달 콘텐츠 컴포넌트
 * @param {boolean} withToggle - 우측 상단 토글 아이콘 추가
 */
export default function ModalContent({
  children,
  className,
  withToggle,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  withToggle?: boolean;
}) {
  const defaultClassName = `
  absolute bottom-0 w-screen 
  sm:bottom-auto sm:w-max sm:top-1/2 sm:left-1/2 
  sm:-translate-x-1/2 sm:-translate-y-1/2 
  rounded-tl-xl rounded-tr-xl
  sm: rounded-xl
  bg-secondary`;
  return (
    <div className={`${defaultClassName} ${className}`} {...rest}>
      {withToggle && (
        <ModalToggle className="absolute right-4 top-4 z-10">
          <UnoptimizedImage src="/icons/X.svg" alt="" width={24} height={24} />
        </ModalToggle>
      )}
      <div className="relative p-4 pb-8">
        <div className="relative px-8 pt-6">{children}</div>
      </div>
    </div>
  );
}
