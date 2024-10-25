/* eslint-disable no-console */
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import DropDown from '@/components/common/Dropdown';
import { Modal } from '@/components/modal';
import TaskLists from '@/components/TaskList/TaskLists';
import Members from '@/components/Team/Members';
import Report from '@/components/Team/Report';
import { useToast } from '@/hooks/useToast';
import {
  useDeleteTeamMutation,
  useInviteGroupQuery,
  useTeamQuery,
} from '@/queries/groups.queries';
import { useGetUser } from '@/queries/users.queries';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WithOutTeam from '../withoutteam';

export default function TeamPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: group, isError, isFetched } = useTeamQuery(Number(id));
  const { data: inviteLink } = useInviteGroupQuery(Number(id));
  const { data: user } = useGetUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      const member = user.memberships.find(
        (membership) => membership.groupId === group?.id
      );
      if (member?.role === 'ADMIN') {
        setIsAdmin(true);

        console.log('true');
      } else {
        console.log('false');
      }
    }
  }, [user, group]);

  const deleteTeam = useDeleteTeamMutation();
  const { toast } = useToast();

  if (!isFetched) {
    return (
      <div className="flex h-[50rem] items-center justify-center">
        <p className="text-4xl">로딩 중 입니다....</p>
      </div>
    );
  }
  if (isError || !group) {
    return <WithOutTeam />;
  }

  const handleInviteGroup = () => {
    if (id && inviteLink) {
      const dataString = JSON.stringify(inviteLink).replace(/"/g, '');
      navigator.clipboard
        .writeText(dataString)
        .then(() => {
          toast({
            title: '복사 성공',
            description: '데이터가 클립보드에 복사되었습니다.',
          });
        })
        .catch((err) => {
          console.error('클립보드 복사 실패:', err);
          toast({
            title: '복사 실패',
            description: '데이터 복사를 실패하였습니다.',
            variant: 'destructive',
          });
        });
    }
  };

  const handleEditTeam = () => {
    router
      .push(`${group.id}/editteam/`)
      .catch((error) => console.error('라우팅 오류:', error));
  };

  const handleDeleteTeam = () => {
    deleteTeam.mutate(Number(id), {
      onSuccess: () => {
        toast({
          title: '팀 삭제 완료',
          description: '팀이 삭제되었습니다',
        });
        router.push('/').catch((error) => console.error('라우팅 오류:', error));
      },
      onError: () => {
        toast({
          title: '팀 삭제 실패',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-5 px-20 pt-10 tab:px-5">
      <div
        className="relative flex h-[4rem] items-center
     justify-start rounded-xl border border-primary bg-secondary pl-5 pr-20"
      >
        <p className="truncate text-xl-bold">{group?.name}</p>
        <div className="absolute right-5 flex items-center gap-7">
          <Image
            src="/images/Thumbnail_team.svg"
            alt="thumbnail"
            width={181}
            height={64}
            priority
          />
          <div className="h-[24px] w-[24px]">
            {isAdmin && (
              <DropDown
                dropdownStyle="transform translate-x-[-80%] z-20"
                trigger={
                  <button type="button">
                    <Image
                      src="/icons/Gear.svg"
                      alt="setting"
                      width={24}
                      height={24}
                    />
                  </button>
                }
              >
                <button
                  className="h-[35px] w-full "
                  type="button"
                  onClick={handleEditTeam}
                >
                  수정하기
                </button>
                <button
                  className="h-[35px] w-full "
                  type="button"
                  onClick={handleDeleteTeam}
                >
                  삭제하기
                </button>
              </DropDown>
            )}
          </div>
        </div>
      </div>
      <TaskLists taskLists={group.taskLists} id={id!.toString()} />
      {isAdmin && <Report id={Number(id)} />}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <p className="text-lg-medium">멤버</p>
          <p className="text-lg-medium text-default">
            ({group.members.length}개)
          </p>
        </div>

        <Modal>
          <Modal.Toggle className="text-brand-primary">
            + 새로운 멤버 초대하기
          </Modal.Toggle>
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content withToggle>
              <div className="flex flex-col gap-5">
                <div>
                  <Modal.Header>
                    <Modal.Title>멤버 초대</Modal.Title>
                  </Modal.Header>
                  <Modal.Summary>
                    그룹에 참여할 수 있는 링크를 복사 합니다.
                  </Modal.Summary>
                </div>
                <Modal.Close>
                  <Button
                    buttonStyle={ButtonStyle.Box}
                    textColor={TextColor.White}
                    textSize={TextSize.Large}
                    buttonWidth={ButtonWidth.Full}
                    buttonBackgroundColor={ButtonBackgroundColor.Green}
                    buttonBorderColor={ButtonBorderColor.Green}
                    buttonPadding={ButtonPadding.Medium}
                    onClick={handleInviteGroup}
                  >
                    링크 복사하기
                  </Button>
                </Modal.Close>
              </div>
            </Modal.Content>
          </Modal.Portal>
        </Modal>
      </div>
      <Members members={group.members} />
    </div>
  );
}
