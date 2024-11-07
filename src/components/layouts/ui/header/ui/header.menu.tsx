import { GROUP_MENU } from '@/components/layouts/consts/_group.menu';
import { UnoptimizedImage } from '@/components/next';
import { Membership } from '@/types/users.types';
import Link from 'next/link';
import { GroupDeleteModal } from '../../membership/GroupDeleteModal';
import { Menu } from '../../menu';

export function HeaderMenu({
  membership,
  deleteGroup,
}: {
  membership: Membership;
  deleteGroup: (id: number) => void;
}) {
  return (
    <>
      <Menu.Trigger menuId={`${GROUP_MENU}:${membership.groupId}`}>
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
        className="right-0 z-10"
        menuId={`${GROUP_MENU}:${membership.groupId}`}
      >
        <div className="grid grid-flow-row auto-rows-fr">
          <Menu.Trigger
            menuId={`${GROUP_MENU}`}
            className="flex items-center justify-center"
          >
            <Link
              href={`/${membership.groupId}/editteam`}
              className="p-4 hover:bg-tertiary"
            >
              수정하기
            </Link>
          </Menu.Trigger>
          <Menu.Trigger
            menuId={`${GROUP_MENU}`}
            className="flex items-center justify-center"
          >
            <GroupDeleteModal
              groupId={membership.groupId}
              deleteGroup={deleteGroup}
            />
          </Menu.Trigger>
        </div>
      </Menu>
    </>
  );
}
