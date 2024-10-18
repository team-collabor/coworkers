/* eslint-disable max-len */

import { USER_MENU } from '@/components/layouts/consts/_user.menu';
import { UnoptimizedImage } from '@/components/next';
import { useAuthStore } from '@/store/useAuthStore';
import { useDropStore } from '@/store/useDropStore';
import { HeaderProfileDrop } from './header.profile.drop';

export default function HeaderProfile() {
  const { toggle } = useDropStore();
  const handle = () => {
    toggle(USER_MENU);
  };
  const { user } = useAuthStore();
  if (!user) {
    return null;
  }
  return (
    <>
      <button
        type="button"
        onClick={handle}
        className={`
          relative ml-auto flex items-center gap-x-2
          hover:scale-105 hover:opacity-80 md:mr-4 xl:mr-0
        `}
      >
        <UnoptimizedImage
          className="cursor-pointer"
          src="/icons/User_large.svg"
          alt=""
          width={24}
          height={24}
        />
        <span className="w-0 cursor-pointer overflow-hidden text-md-medium md:w-auto">
          {user?.nickname}
        </span>
      </button>
      <HeaderProfileDrop handle={handle} />
    </>
  );
}
