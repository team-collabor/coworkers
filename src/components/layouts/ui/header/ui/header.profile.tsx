/* eslint-disable max-len */

import Dropdown from '@/components/common/dropdown';
import { useRootContext } from '@/components/layouts/model/root.context';
import { useSignIn } from '@/queries/auth.queries';
import Link from 'next/link';
import HeaderProfileSkeleton from './header.profile.skeleton';
import ProfileModal from './profile.modal';

export default function HeaderProfile() {
  const { user } = useRootContext();
  const { logout } = useSignIn();
  if (user.loading) {
    return <HeaderProfileSkeleton />;
  }
  return user.data ? (
    <div
      className={`
    ml-auto flex min-w-max items-center gap-x-2 transition-all duration-500 ease-in-out
    hover:opacity-80 md:mr-4 xl:mr-0
    `}
    >
      <ProfileModal user={user.data} />
      <Dropdown
        dropdownStyle={`
          flex flex-col -translate-x-[4.4rem] translate-y-[1.3rem]
          min-h-max
          `}
        trigger={
          <span className="w-0 cursor-pointer overflow-hidden text-md-medium hover:scale-105 md:w-auto">
            {user.data.nickname}
          </span>
        }
      >
        <Link href="/history">
          <button type="button" className="py-[0.875rem]">
            마이 히스토리
          </button>
        </Link>
        <button type="button" className="py-[0.875rem]">
          계정 설정
        </button>
        <button type="button" className="py-[0.875rem]">
          팀 참여
        </button>
        <button type="button" className="py-[0.875rem]" onClick={logout}>
          로그아웃
        </button>
      </Dropdown>
    </div>
  ) : null;
}
