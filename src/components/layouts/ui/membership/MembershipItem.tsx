import { ASIDE_MENU } from '@/components/layouts/consts/_aside.menu';
import { UnoptimizedImage } from '@/components/next';
import { Membership } from '@/types/users.types';
import { cn } from '@/utils/tailwind/cn';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Menu } from '../menu';
import { GroupDeleteModal } from './GroupDeleteModal';

export const MembershipItem = memo(
  ({
    groupId,
    group,
    role,
    deleteGroup,
  }: Membership & {
    deleteGroup: (id: number) => void;
  }) => {
    return (
      <li
        key={groupId}
        className={cn(['relative grid grid-cols-[auto_max-content] gap-x-4'])}
      >
        <Menu.Trigger menuId={ASIDE_MENU} className="flex items-center gap-x-2">
          {group.image ? (
            <div className="relative size-7">
              <Image src={group.image} alt="" fill className="rounded-full" />
            </div>
          ) : (
            <ImageIcon width={32} height={32} />
          )}
          <Link
            href={`teams/${groupId}`}
            type="button"
            className={cn([
              'w-36 overflow-hidden text-ellipsis whitespace-nowrap',
              'hover:scale-105 hover:opacity-80',
            ])}
          >
            {group.name}
          </Link>
        </Menu.Trigger>
        {role === 'ADMIN' && (
          <Menu.Trigger menuId={`${ASIDE_MENU}:${groupId}`}>
            <button type="button">
              <UnoptimizedImage
                src="/icons/Kebab_large.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </Menu.Trigger>
        )}
        <Menu
          className="right-0 z-10 -translate-y-8"
          menuId={`${ASIDE_MENU}:${groupId}`}
        >
          <div className="grid grid-flow-row auto-rows-fr">
            <Menu.Trigger
              menuId={`${ASIDE_MENU}`}
              className="flex items-center justify-center"
            >
              <Link
                href={`teams/${groupId}/editteam`}
                className="p-4 hover:bg-tertiary"
              >
                수정하기
              </Link>
            </Menu.Trigger>
            <Menu.Trigger
              menuId={`${ASIDE_MENU}`}
              className="flex items-center justify-center"
            >
              <GroupDeleteModal groupId={groupId} deleteGroup={deleteGroup} />
            </Menu.Trigger>
          </div>
        </Menu>
      </li>
    );
  }
);
