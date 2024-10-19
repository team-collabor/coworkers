import { ASIDE_MENU } from '@/components/layouts/consts/_aside.menu';
import { UnoptimizedImage } from '@/components/next';
import { useGetMemberships } from '@/queries/users.queries';
import Link from 'next/link';
import { Menu } from '../../menu';

export default function AsideNav() {
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
            <Menu.Trigger id={`${ASIDE_MENU}:${m.groupId}`}>
              <button type="button">
                <UnoptimizedImage
                  src="/icons/Kebab_large.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </Menu.Trigger>
            <Menu
              className="right-0 z-10 -translate-y-8"
              id={`${ASIDE_MENU}:${m.groupId}`}
            >
              <div className="grid grid-flow-row auto-rows-fr">
                <button type="button" className="p-4 hover:bg-tertiary">
                  수정하기
                </button>
                <button type="button" className="p-4 hover:bg-tertiary">
                  삭제하기
                </button>
              </div>
            </Menu>
          </li>
        );
      })}
      <li className="hover:scale-105 hover:opacity-80">
        <Link href="/boards">자유게시판</Link>
      </li>
    </ul>
  );
}
