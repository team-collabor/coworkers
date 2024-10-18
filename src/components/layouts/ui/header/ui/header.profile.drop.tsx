import { USER_MENU } from '@/components/layouts/consts/_user.menu';
import { findHook } from '@/components/layouts/lib/use-find-hook';
import { useSignIn } from '@/queries/auth.queries';
import { useDropStore } from '@/store/useDropStore';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const buttonSt = 'px-6 py-[14px] hover:bg-tertiary';

export function HeaderProfileDrop({ handle }: { handle: () => void }) {
  const { hooks } = useDropStore();
  const { push } = useRouter();
  const { logout } = useSignIn();
  const isOpen = findHook(hooks, USER_MENU);
  return (
    <div
      className={clsx(
        `absolute right-0 top-[4rem] -z-10 grid 
    grid-flow-row auto-rows-fr overflow-hidden
    rounded-xl border-2 border-primary 
    bg-secondary text-center transition-all 
    duration-200 ease-in-out
  `,
        {
          'h-1 -translate-y-[50%]': !isOpen,
        }
      )}
    >
      <button type="button" onClick={handle}>
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
            push('/').catch(() => {
              // 계정 설정
            });
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
            push('/').catch(() => {
              // 로그아웃
            });
          }}
        >
          로그아웃
        </div>
      </button>
    </div>
  );
}
