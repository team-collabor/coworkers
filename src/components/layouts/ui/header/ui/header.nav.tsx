/* eslint-disable max-len */
import { GROUP_MENU } from '@/components/layouts/consts/_group.menu';
import { UnoptimizedImage } from '@/components/next';
import { useGetMemberships } from '@/queries/users.queries';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu } from '../../menu';

export default function HeaderNav() {
  const [currentTop, setCurrentTop] = useState<string>('');
  const { data: memberships } = useGetMemberships();
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
        grid h-full w-auto auto-cols-fr grid-flow-col 
        items-center gap-x-4 whitespace-nowrap
        `}
      >
        <div className="flex items-center gap-x-2 hover:opacity-80">
          <Menu.Trigger
            className="flex items-center gap-x-2"
            id={GROUP_MENU}
            onEvent={() => {
              setCurrentTop(currentTop);
            }}
          >
            {currentTop}
            <UnoptimizedImage
              src="/icons/Toggle.svg"
              alt=""
              width={32}
              height={32}
            />
          </Menu.Trigger>
        </div>
        <Menu id={GROUP_MENU}>
          {memberships.map((m, index) => (
            <li key={m.groupId} className="relative flex items-center">
              <Link href={`/${m.groupId}`}>
                <Menu.Trigger
                  className="flex"
                  id={GROUP_MENU}
                  onEvent={() => {
                    setCurrentTop(m.group.name);
                  }}
                >
                  <button
                    type="button"
                    className="grid grid-cols-[1fr_2fr_auto] items-center gap-x-4 p-4 hover:bg-tertiary"
                  >
                    <div className="size-12 bg-red-500" />
                    <div className="text-start">{m.group.name}</div>
                  </button>
                </Menu.Trigger>
              </Link>
              {m.role === 'ADMIN' && (
                <>
                  <Menu.Trigger id={`${GROUP_MENU}:${m.groupId}`}>
                    <button type="button">
                      <UnoptimizedImage
                        className="justify-self-end"
                        src="/icons/Kebab_large.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                    </button>
                  </Menu.Trigger>
                  <Menu
                    className={`
                      right-0 z-10 
                      ${memberships.length - 1 === index ? '-top-16' : ''}`}
                    id={`${GROUP_MENU}:${m.groupId}`}
                  >
                    <div className="grid grid-flow-row auto-rows-fr">
                      <button type="button" className="p-2 hover:bg-tertiary">
                        수정하기
                      </button>
                      <button type="button" className="p-2 hover:bg-tertiary">
                        삭제하기
                      </button>
                    </div>
                  </Menu>
                </>
              )}
            </li>
          ))}
        </Menu>
        <li className="hover:scale-105 hover:opacity-80">
          <Link href="/boards">자유게시판</Link>
        </li>
      </ul>
    </nav>
  );
}
