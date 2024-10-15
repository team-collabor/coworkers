import Dropdown from '@/components/common/dropdown';
import { useRootContext } from '@/components/layouts/model/root.context';
import { UnoptimizedImage } from '@/components/next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import HeaderNavSkeleton from './header.nav.skeleton';

export default function HeaderNav() {
  const { memberships } = useRootContext();
  const [currentTop, setCurrentTop] = useState<string>('');
  useEffect(() => {
    setCurrentTop(memberships.data?.data?.[0].group.name || '');
  }, [memberships.data?.data]);
  if (memberships.loading) {
    return <HeaderNavSkeleton />;
  }
  return (
    <nav className="scrollbar-none mx-10 hidden h-full md:block">
      <ul
        className={`
        flex h-full flex-row items-center 
        gap-x-10 whitespace-nowrap`}
      >
        <Dropdown
          trigger={
            <div className="flex items-center gap-x-2 hover:opacity-80">
              <button type="button">{currentTop}</button>
              <UnoptimizedImage
                src="/icons/Toggle.svg"
                alt=""
                width={32}
                height={32}
              />
            </div>
          }
          dropdownStyle={`
            translate-y-4 -translate-x-[245px] overflow-hidden min-w-max
          `}
        >
          {memberships.data?.data?.map((m) => {
            return (
              <div
                key={m.groupId}
                className="grid grid-cols-[1fr_auto] items-center"
              >
                <button
                  type="button"
                  className="grid grid-cols-[auto_1fr] items-center gap-x-4 p-4"
                  onClick={() => setCurrentTop(m.group.name)}
                >
                  <div className="size-12 bg-red-500" />
                  <div className="text-start">{m.group.name}</div>
                </button>
                {m.role === 'ADMIN' && (
                  <UnoptimizedImage
                    src="/icons/Kebab_large.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                )}
              </div>
            );
          })}
        </Dropdown>
        <li className="hover:scale-105 hover:opacity-80">
          <Link href="/boards">자유게시판</Link>
        </li>
      </ul>
    </nav>
  );
}