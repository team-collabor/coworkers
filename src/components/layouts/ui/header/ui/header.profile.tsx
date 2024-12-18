/* eslint-disable max-len */

import { USER_MENU } from '@/components/layouts/consts/_user.menu';
import { UnoptimizedImage } from '@/components/next';
import { useOAuthSignIn, useSignIn } from '@/queries/auth.queries';
import { User } from '@/types/users.types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu } from '../../menu';

const buttonSt = 'px-6 py-[14px] hover:bg-tertiary';

export default function HeaderProfile({ user }: { user: User }) {
  const { push } = useRouter();
  const { logout } = useSignIn();
  const { oAuthLogout } = useOAuthSignIn();

  return (
    <>
      <Menu.Trigger
        menuId={USER_MENU}
        className="ml-auto flex items-center gap-x-2"
      >
        {user.image ? (
          <Image
            className="cursor-pointer rounded-full"
            src={user.image}
            alt="userImage"
            width={24}
            height={24}
          />
        ) : (
          <UnoptimizedImage
            className="cursor-pointer"
            src="/icons/User_large.svg"
            alt="userEmptyImage"
            width={24}
            height={24}
          />
        )}
        <span className="w-0 cursor-pointer overflow-hidden text-md-medium md:w-auto">
          {user?.nickname}
        </span>
      </Menu.Trigger>
      <Menu menuId={USER_MENU} className="right-0">
        <Menu.Trigger menuId={USER_MENU}>
          <div
            className={buttonSt}
            onClick={() => {
              push('/history').catch(() => {
                // 마이 히스토리
              });
            }}
          >
            마이 히스토리
          </div>
          <div
            className={buttonSt}
            onClick={() => {
              push('/mypage');
            }}
          >
            계정 설정
          </div>
          <div
            className={buttonSt}
            onClick={() => {
              push('/attendteam').catch(() => {
                // 팀 참여하기
              });
            }}
          >
            팀 참여
          </div>
          <div
            className={buttonSt}
            onClick={() => {
              logout();
              oAuthLogout();
              push('/').catch(() => {
                // 로그아웃
              });
            }}
          >
            로그아웃
          </div>
        </Menu.Trigger>
      </Menu>
    </>
  );
}
