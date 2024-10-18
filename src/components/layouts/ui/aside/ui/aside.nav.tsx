import { ASIDE_MENU } from '@/components/layouts/consts/_aside.menu';
import { findHook } from '@/components/layouts/lib/use-find-hook';
import { UnoptimizedImage } from '@/components/next';
import { useGetMemberships } from '@/queries/users.queries';
import { useDropStore } from '@/store/useDropStore';
import clsx from 'clsx';
import Link from 'next/link';

/* eslint-disable max-len */
export default function AsideNav() {
  const { hooks, toggle } = useDropStore();
  const { data: memberships } = useGetMemberships();
  if (!memberships) {
    return null;
  }
  return (
    <ul
      className={`
        relative flex translate-y-16 flex-col gap-y-6 
        p-4 text-md-medium text-primary
      `}
    >
      {memberships.map((m) => {
        return (
          <li key={m.groupId} className="relative flex justify-between gap-x-4">
            <button type="button" className="hover:scale-105 hover:opacity-80">
              <span>{m.group.name}</span>
            </button>
            <button type="button" className="hover:opacity-80">
              <UnoptimizedImage
                src="/icons/Kebab_large.svg"
                alt=""
                width={24}
                height={24}
                onClick={() => toggle(`${ASIDE_MENU}:${m.groupId}`)}
                aria-label="more_action"
                data-hook={`${ASIDE_MENU}:${m.groupId}`}
              />
            </button>
            <div
              className={clsx(
                `absolute right-0 top-[4rem] -z-10 grid 
                grid-flow-row auto-rows-fr overflow-hidden
                rounded-xl border-2 border-primary 
                bg-secondary text-center transition-all 
                duration-200 ease-in-out
                `,
                {
                  'h-1 -translate-y-[50%]': !findHook(
                    hooks,
                    `${ASIDE_MENU}:${m.group.id}`
                  ),
                }
              )}
            >
              asdasd
            </div>
          </li>
        );
      })}
      <li className="hover:scale-105 hover:opacity-80">
        <Link href="/boards">자유게시판</Link>
      </li>
    </ul>
  );
}
