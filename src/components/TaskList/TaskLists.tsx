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
import {
  useDeleteTaskList,
  useTaskListMutation,
} from '@/queries/taskList.queries';
import { useTaskStore } from '@/store/useTaskStore';
import { TaskList } from '@/types/tasklist.types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Badge from '../common/Badge';
import Dropdown from '../common/Dropdown';
import Input from '../common/Input';
import VirtualScroll from './VirtualScroll';

interface TaskListProps {
  taskLists: TaskList[] | [];
  groupId: string;
  isMember: boolean;
}

interface TaskItemProps {
  taskList: TaskList;
  taskListColor: string;
  isMember: boolean;
}

function TaskItem({ taskList, taskListColor, isMember }: TaskItemProps) {
  const router = useRouter();
  const deleteTask = useDeleteTaskList();
  const { setSelectedTaskList } = useTaskStore();

  const handleTaskClick = (e: React.MouseEvent) => {
    setSelectedTaskList(taskList);
    router.push(`/teams/${taskList.groupId}/tasks`);
    e.stopPropagation();
  };

  const handleTaskDelete = () => {
    deleteTask.mutate({ groupId: taskList.groupId, taskListId: taskList.id });
  };

  return (
    <div
      className="relative mb-[10px] flex h-[40px] items-center 
     justify-between rounded-xl bg-secondary px-5"
      onClick={handleTaskClick}
    >
      <div
        className={`absolute bottom-0 left-0 top-0 
          z-0  w-[0.8rem] rounded-l-xl ${taskListColor}`}
      />
      <span className="truncate text-md-medium">{taskList.name}</span>
      <div className="flex h-[1.5625rem] gap-1">
        <div className="w-[3.8rem]">
          <Badge
            count={taskList.tasks.filter((task) => task.doneAt).length}
            left={taskList.tasks.length}
          />
        </div>
        {isMember && (
          <Dropdown
            dropdownStyle="transform translate-x-[-105%]
             translate-y-[-70%] z-20"
            trigger={
              <button
                type="button"
                className="w-[20px] rounded-lg hover:bg-tertiary"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src="../icons/Kebab_large.svg"
                  alt="kebab"
                  width={16}
                  height={16}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </button>
            }
          >
            <button
              className=" h-[35px] w-full "
              type="button"
              onClick={handleTaskDelete}
            >
              삭제하기
            </button>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default function TaskLists({
  taskLists,
  groupId: id,
  isMember,
}: TaskListProps) {
  const TASK_LIST_COLORS = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
  ];
  const createTaskList = useTaskListMutation();
  const [taskListName, setTaskListName] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTaskListName(event.target.value);
  };

  const handleCreateTask = () => {
    createTaskList.mutate({ groupId: Number(id), name: taskListName });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <p className="text-lg-medium">할 일 목록</p>
          <p className="text-lg-medium text-default">({taskLists.length}개)</p>
        </div>
        {isMember && (
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
        )}
      </div>
      {taskLists.length === 0 ? (
        <div className="flex h-[9rem] items-center justify-center">
          <span className="text-center text-lg-medium text-default">
            아직 할 일 목록이 없습니다.
          </span>
        </div>
      ) : (
        <div className="h-[200px]">
          <VirtualScroll
            itemHeight={40} // 각 TaskItem의 높이 (패딩과 마진을 고려하여 설정)
            renderAhead={1} // 미리 렌더링할 항목 수
          >
            {taskLists.map((taskList, index) => (
              <TaskItem
                key={taskList.id}
                taskList={taskList}
                taskListColor={
                  TASK_LIST_COLORS[index % TASK_LIST_COLORS.length]
                }
                isMember={isMember}
              />
            ))}
          </VirtualScroll>
        </div>
      )}
    </div>
  );
}
