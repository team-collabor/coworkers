import { cn } from '@/utils/tailwind/cn';
import Link from 'next/link';
import { Menu } from '../menu';

export function GroupAddButton({ menuId }: { menuId: string }) {
  return (
    <Menu.Trigger menuId={menuId}>
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
  );
}
