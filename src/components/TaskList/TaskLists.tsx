import Badge from '@/components/common/Badge';
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import { Modal } from '@/components/modal';
import { useToast } from '@/hooks/useToast';
import { useTaskListMutation } from '@/queries/groups.queries';
import { TaskList } from '@/types/tasklist.types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Input from '../common/Input';
import VirtualScroll from './VirtualScroll';

interface TaskListProps {
  taskLists: TaskList[];
  id: string;
}

interface TaskItemProps {
  taskList: TaskList;
  taskListColor: string;
}

function TaskItem({ taskList, taskListColor }: TaskItemProps) {
  return (
    <div
      className="relative mb-[10px] flex h-[42px] items-center 
     justify-between rounded-xl bg-secondary px-5"
    >
      <div
        className={`absolute bottom-0 left-0 top-0 
          z-0  w-[0.8rem] rounded-l-xl ${taskListColor}`}
      />
      <span className="text-md-medium">{taskList.name}</span>
      <div className="flex h-[1.5625rem] gap-1">
        <Badge
          count={taskList.tasks.filter((task) => task.doneAt).length}
          left={taskList.tasks.length}
        />
        <Image
          src="../icons/Kebab_large.svg"
          alt="kebab"
          width={16}
          height={16}
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </div>
  );
}

export default function TaskLists({ taskLists, id }: TaskListProps) {
  const TASK_LIST_COLORS = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
  ];
  const createTaskList = useTaskListMutation();
  const { toast } = useToast();
  const [taskListName, setTaskListName] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTaskListName(event.target.value);
  };

  const handleCreateTask = () => {
    createTaskList.mutate(
      { groupId: Number(id), name: taskListName },
      {
        onSuccess: () => {
          toast({
            title: '목록생성 완료',
            description: '새 목록이 생성되었습니다',
          });
        },
        onError: (err) => {
          toast({
            title: '목록생성 실패',
            description: err.message,
            variant: 'destructive',
          });
        },
      }
    );
  };

  if (taskLists.length === 0) {
    return (
      <div className="flex h-[9rem] items-center justify-center">
        <span className="text-center text-lg-medium text-default">
          아직 할 일 목록이 없습니다.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <p className="text-lg-medium">할 일 목록</p>
          <p className="text-lg-medium text-default">({taskLists.length}개)</p>
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
                  onChange={handleNameChange}
                />
                <Modal.Close>
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
                </Modal.Close>
              </div>
            </Modal.Content>
          </Modal.Portal>
        </Modal>
      </div>

      <div className="h-[13rem]">
        <VirtualScroll
          itemHeight={40} // 각 TaskItem의 높이 (패딩과 마진을 고려하여 설정)
          renderAhead={4} // 미리 렌더링할 항목 수
        >
          {taskLists.map((taskList, index) => (
            <Link key={taskList.id} href={`/${id}/tasks`}>
              <TaskItem
                key={taskList.id}
                taskList={taskList}
                taskListColor={
                  TASK_LIST_COLORS[index % TASK_LIST_COLORS.length]
                }
              />
            </Link>
          ))}
        </VirtualScroll>
      </div>
    </div>
  );
}
