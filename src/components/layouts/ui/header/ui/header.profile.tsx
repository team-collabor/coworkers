/* eslint-disable max-len */
import { UnoptimizedImage } from '@/components/common/next';

export default function HeaderProfile() {
  return (
    <div
      className={`
      ml-auto flex min-w-max items-center gap-x-2 transition-all duration-500 ease-in-out
      hover:opacity-80 md:mr-4 xl:mr-0
      `}
    >
      <UnoptimizedImage
        className="hover:scale-110"
        src="/icons/User_large.svg"
        alt=""
        width={24}
        height={24}
      />
      <span className="w-0 overflow-hidden text-md-medium hover:scale-105 md:w-auto">
        양해나
      </span>
    </div>
  );
}
