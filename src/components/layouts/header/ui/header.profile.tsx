/* eslint-disable max-len */
import { UnoptimizedImage } from '@/components/common/next';

export default function HeaderProfile() {
  return (
    <div className="ml-auto mr-4 flex min-w-max items-center gap-x-2 hover:opacity-80 xl:mr-0">
      <UnoptimizedImage
        src="/icons/User_large.svg"
        alt=""
        width={24}
        height={24}
      />
      <span className="hidden text-md-medium  md:block">양해나</span>
    </div>
  );
}
