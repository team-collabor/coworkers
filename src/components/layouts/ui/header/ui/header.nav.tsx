import { GROUP_MENU } from '@/components/layouts/consts/_group.menu';
import { UnoptimizedImage } from '@/components/next';
import { useToast } from '@/hooks/useToast';
import { useDeleteTeamMutation } from '@/queries/groups.queries';
import { useGetMemberships } from '@/queries/users.queries';
import { cn } from '@/utils/tailwind/cn';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GroupAddButton } from '../../membership/GroupAddButton';
import { Menu } from '../../menu';
import { HeaderMenu } from './header.menu';

export default function HeaderNav() {
  const [currentTop, setCurrentTop] = useState<{
    name: string;
    image: string | null;
  }>({
    name: '',
    image: null,
  });
  const { data: memberships, refetch } = useGetMemberships();
  useEffect(() => {
    if (memberships && memberships.length > 0) {
      setCurrentTop({
        name: memberships[0].group.name,
        image: memberships[0].group.image,
      });
    }
  }, [memberships]);
  const { mutate, isSuccess, isError } = useDeleteTeamMutation();
  const { toast } = useToast();
  const deleteGroup = (id: number) => mutate(id);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: '그룹 삭제 완료.',
        description: '성공적으로 그룹이 삭제되었습니다.',
      });
      refetch();
    }
    if (isError) {
      toast({
        title: '그룹 삭제 실패.',
        description: '그룹 삭제에 실패했습니다.',
      });
    }
  }, [isError, isSuccess, refetch, toast]);
  return (
    <nav className="scrollbar-none mx-10 hidden h-full md:block">
      <ul
        className={`
        grid h-full w-auto auto-cols-fr grid-flow-col 
        items-center gap-x-4 whitespace-nowrap
        `}
      >
        {memberships && memberships.length > 0 ? (
          <li className="flex items-center gap-x-2 hover:opacity-80">
            <Menu.Trigger
              className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2"
              menuId={GROUP_MENU}
              onEvent={() => {
                setCurrentTop({
                  name: currentTop.name,
                  image: currentTop.image,
                });
              }}
            >
              {currentTop.image ? (
                <div className="relative size-6">
                  <Image src={currentTop.image} alt="" fill />
                </div>
              ) : (
                <ImageIcon width={24} height={24} />
              )}
              <span
                className={cn([
                  'max-w-32 overflow-hidden text-ellipsis whitespace-nowrap',
                ])}
              >
                {currentTop.name}
              </span>
              <UnoptimizedImage
                src="/icons/Toggle.svg"
                alt=""
                width={32}
                height={32}
              />
            </Menu.Trigger>
          </li>
        ) : (
          <li>
            <Link href="/addteam">팀 추가하기</Link>
          </li>
        )}
        <Menu menuId={GROUP_MENU}>
          <ul className="relative h-[15.25rem] overflow-auto">
            {memberships &&
              memberships.map((m) => (
                <li key={m.groupId} className="relative flex items-center">
                  <Link href={`/${m.groupId}`}>
                    <Menu.Trigger
                      className="flex"
                      menuId={GROUP_MENU}
                      onEvent={() => {
                        setCurrentTop({
                          name: m.group.name,
                          image: m.group.image,
                        });
                      }}
                    >
                      <button
                        type="button"
                        className={cn([
                          'grid grid-cols-[1fr_10fr_1fr] items-center',
                          'max-w-56 gap-x-4 p-4',
                          ' hover:bg-tertiary',
                        ])}
                      >
                        {m.group.image ? (
                          <div className="relative size-6">
                            <Image src={m.group.image} alt="" fill />
                          </div>
                        ) : (
                          <ImageIcon />
                        )}
                        <div
                          className={cn([
                            'overflow-hidden text-ellipsis text-start',
                          ])}
                        >
                          {m.group.name}
                        </div>
                      </button>
                    </Menu.Trigger>
                  </Link>
                  {m.role === 'ADMIN' ? (
                    <HeaderMenu membership={m} deleteGroup={deleteGroup} />
                  ) : (
                    <div />
                  )}
                </li>
              ))}
            <li className="p-4">
              <GroupAddButton menuId={GROUP_MENU} />
            </li>
          </ul>
        </Menu>
        <li className="hover:scale-105 hover:opacity-80">
          <Link href="/boards">자유게시판</Link>
        </li>
      </ul>
    </nav>
  );
}
