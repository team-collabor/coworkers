import { UnoptimizedImage } from '@/components/next';
import { cn } from '@/utils/tailwind/cn';
import { HTMLAttributes, useRef } from 'react';
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
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={cn(
        'fixed bottom-0 left-1/2 -translate-x-1/2',
        'max-h-[calc(100%-4rem)] w-full',
        'overflow-y-auto bg-secondary',
        'sm:bottom-[calc(50%-2rem)] sm:translate-y-1/2',
        'sm:w-fit sm:min-w-max sm:rounded-xl',
        className
      )}
      {...rest}
    >
      {withToggle && (
        <ModalToggle className="absolute right-4 top-4 z-10">
          <UnoptimizedImage src="/icons/X.svg" alt="" width={24} height={24} />
        </ModalToggle>
      )}
      <div className="p-4 pb-8">
        <div className="px-8 pt-6">{children}</div>
      </div>
    </div>
  );
}
