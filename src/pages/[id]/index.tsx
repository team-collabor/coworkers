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
import Input from '@/components/common/Input';
import { Modal } from '@/components/modal';
import TaskLists from '@/components/TaskList/TaskLists';
import Members from '@/components/Team/Members';
import CircularProgressChart from '@/components/Team/Progress';
import { useToast } from '@/hooks/useToast';
import {
  useDeleteTeamMutation,
  useInviteGroupQuery,
  useTaskListMutation,
  useTeamQuery,
} from '@/queries/groups.queries';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function TeamPage() {
  const router = useRouter();
  const { id } = router.query;
  const { team, isError } = useTeamQuery(Number(id));
  const { data } = useInviteGroupQuery(Number(id));
  const createTaskList = useTaskListMutation();
  const deleteTeam = useDeleteTeamMutation();
  const taskListNameRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  if (isError || !team) {
    return <p>팀 정보를 불러오는 데 실패했습니다.</p>;
  }

  const handleInviteGroup = () => {
    if (id && data) {
      const dataString = JSON.stringify(data).replace(/"/g, '');
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
      .push(`${team.id}/editteam/`)
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

  const handleCreateTask = () => {
    const taskListName = taskListNameRef.current?.value.trim() || '';

    if (taskListName) {
      createTaskList.mutate(
        { groupId: Number(id), name: taskListName },
        {
          onSuccess: () => {
            toast({
              title: '목록생성 완료',
              description: '새 목록이 생성되었습니다',
            });
          },
          onError: () => {
            toast({
              title: '목록생성 실패',
              variant: 'destructive',
            });
          },
        }
      );
      if (taskListNameRef.current) {
        taskListNameRef.current.value = '';
      }
    } else {
      toast({
        title: '목록생성 실패',
        description: '할 일 목록명을 입력해주세요.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-5 px-20 pt-10 tab:px-5">
      <div
        className="flex h-[4rem] items-center
     justify-between  rounded-xl border border-primary bg-secondary px-5"
      >
        <p className="text-xl-bold">{team?.name}</p>
        <div className="flex items-center gap-7">
          <Image
            src="/images/Thumbnail_team.svg"
            alt="thumbnail"
            width={181}
            height={64}
            priority
          />
          <div className="h-[24px] w-[24px]">
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
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <p className="text-lg-medium">할 일 목록</p>
          <p className="text-lg-medium text-default">
            ({team.taskLists.length}개)
          </p>
        </div>

        <Modal>
          <Modal.Toggle className="text-brand-primary">
            + 새로운 목록 추가하기
          </Modal.Toggle>
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content withToggle>
              <div className="flex flex-col gap-5">
                <Modal.Header>
                  <Modal.Title>할 일 목록</Modal.Title>
                </Modal.Header>
                <Input
                  id="task-list-name"
                  wrapperClassName="w-[280px]"
                  placeholder="목록 명을 입력해주세요"
                  ref={taskListNameRef}
                />
                <Modal.Toggle>
                  <div>
                    <Button
                      buttonStyle={ButtonStyle.Box}
                      textColor={TextColor.White}
                      textSize={TextSize.Large}
                      buttonWidth={ButtonWidth.Full}
                      buttonBackgroundColor={ButtonBackgroundColor.Green}
                      buttonBorderColor={ButtonBorderColor.Green}
                      buttonPadding={ButtonPadding.Medium}
                      onClick={handleCreateTask}
                    >
                      만들기
                    </Button>
                  </div>
                </Modal.Toggle>
              </div>
            </Modal.Content>
          </Modal.Portal>
        </Modal>
      </div>

      <TaskLists taskLists={team.taskLists} />

      <p className="text-lg-medium">리포트</p>
      <div
        className="flex h-[13.5625rem] items-center
     justify-between rounded-xl bg-secondary px-5 mob:gap-5"
      >
        <CircularProgressChart />

        <div className="flex w-[25rem] flex-col gap-5 tab:w-[17.5rem]">
          <div
            className="flex h-[4.78125rem] 
           items-center justify-between rounded-xl bg-tertiary p-5"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs-medium text-secondary ">오늘의 할 일</p>
              <p className="text-2xl-bold text-brand-tertiary">0개</p>
            </div>
            <Image src="../images/Todo.svg" alt="todo" width={40} height={40} />
          </div>
          <div
            className="flex h-[4.78125rem]  items-center 
          justify-between rounded-xl bg-tertiary p-5"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs-medium text-secondary ">한 일</p>
              <p className="text-2xl-bold text-brand-tertiary">0개</p>
            </div>
            <Image
              src="/images/Done.svg"
              alt="완료된 작업"
              width={40}
              height={40}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <p className="text-lg-medium">멤버</p>
          <p className="text-lg-medium text-default">
            ({team.members.length}개)
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
                <Modal.Toggle>
                  <div>
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
                  </div>
                </Modal.Toggle>
              </div>
            </Modal.Content>
          </Modal.Portal>
        </Modal>
      </div>
      <Members members={team.members} />
    </div>
  );
}
