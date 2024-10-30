import { ASIDE_MENU } from '@/components/layouts/consts/_aside.menu';
import { useToast } from '@/hooks/useToast';
import { useDeleteTeamMutation } from '@/queries/groups.queries';
import { useGetMemberships } from '@/queries/users.queries';
import { cn } from '@/utils/tailwind/cn';
import Link from 'next/link';
import { useEffect } from 'react';
import { MembershipItem } from '../../membership/MembershipItem';
import { Menu } from '../../menu';

export default function AsideNav() {
  const { data: memberships, refetch } = useGetMemberships();
  const { mutate, isPending, isSuccess, isError } = useDeleteTeamMutation();
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
      {!isPending &&
        memberships.map((m) => (
          <MembershipItem {...m} deleteGroup={deleteGroup} />
        ))}
      <li className="hover:scale-105 hover:opacity-80">
        <Link href="/boards">자유게시판</Link>
      </li>
      <li className="p-4">
        <Menu.Trigger menuId={ASIDE_MENU}>
          <Link href="addteam">
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
    </ul>
  );
}
