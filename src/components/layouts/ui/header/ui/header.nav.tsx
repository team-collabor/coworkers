/* eslint-disable max-len */
import { GROUP_MENU } from '@/components/layouts/consts/_group.menu';
import { findHook } from '@/components/layouts/lib/use-find-hook';
import { UnoptimizedImage } from '@/components/next';
import { useGetMemberships } from '@/queries/users.queries';
import { useDropStore } from '@/store/useDropStore';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeaderNav() {
  const [currentTop, setCurrentTop] = useState<string>('');
  const { data: memberships } = useGetMemberships();
  const { hooks, toggle } = useDropStore();
  const isOpen = findHook(hooks, GROUP_MENU);
  const trigger = () => toggle(GROUP_MENU);
  useEffect(() => {
    if (memberships && memberships.length > 0) {
      setCurrentTop(memberships[0].group.name);
    }
  }, [memberships]);
  if (!memberships) return null;
  return (
    <nav className="scrollbar-none mx-10 hidden h-full md:block">
      <ul
        className={`
        grid h-full w-auto auto-cols-fr grid-flow-col items-center gap-x-4 whitespace-nowrap`}
      >
        <div className="flex items-center gap-x-2 hover:opacity-80">
          <button
            type="button"
            onClick={() => {
              trigger();
            }}
          >
            {currentTop}
          </button>
          <UnoptimizedImage
            src="/icons/Toggle.svg"
            alt=""
            width={32}
            height={32}
          />
        </div>
        <div
          className={clsx(
            `absolute left-6 top-[4rem] -z-10 grid 
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
          {memberships.map((m) => (
            <li
              key={m.groupId}
              className="grid grid-cols-[1fr_auto] items-center"
            >
              <Link href={`/${m.groupId}`}>
                <button
                  type="button"
                  className="grid grid-cols-[auto_1fr] items-center gap-x-4 p-4"
                  onClick={() => {
                    setCurrentTop(m.group.name);
                    trigger();
                  }}
                >
                  <div className="size-12 bg-red-500" />
                  <div className="text-start">{m.group.name}</div>
                </button>
              </Link>
              {m.role === 'ADMIN' && (
                <UnoptimizedImage
                  src="/icons/Kebab_large.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-label="more_action"
                />
              )}
            </li>
          ))}
        </div>
        <li className="hover:scale-105 hover:opacity-80">
          <Link href="/boards">자유게시판</Link>
        </li>
      </ul>
    </nav>
  );
}
