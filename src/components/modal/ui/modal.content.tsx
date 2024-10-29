import { UnoptimizedImage } from '@/components/next';
import { cn } from '@/utils/tailwind/cn';
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
  return (
    <div
      className={cn(
        'relative -top-16 left-1/2 -translate-x-1/2 -translate-y-full',
        'h-full max-h-[calc(100vh-4rem)] w-full overflow-y-auto',
        'rounded-tl-xl rounded-tr-xl',
        'bg-secondary',
        'sm:left-1/2 sm:top-[50vh]',
        'sm:-translate-x-1/2 sm:-translate-y-[calc(50%-2rem)]',
        'sm:h-auto sm:w-max',
        'sm:rounded-xl',
        className
      )}
      {...rest}
    >
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
