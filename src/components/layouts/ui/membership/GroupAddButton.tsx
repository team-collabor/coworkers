import { cn } from '@/utils/tailwind/cn';
import Link from 'next/link';
import { GROUP_MENU } from '../../consts/_group.menu';
import { Menu } from '../menu';

export function GroupAddButton() {
  return (
    <li className="p-4">
      <Menu.Trigger menuId={GROUP_MENU}>
        <Link href="/addteam">
          <div
            className={cn([
              'flex items-center justify-center ',
              'h-12 rounded-xl border border-solid border-slate-50',
            ])}
          >
            팀 추가하기
          </div>
        </Link>
      </Menu.Trigger>
    </li>
  );
}
