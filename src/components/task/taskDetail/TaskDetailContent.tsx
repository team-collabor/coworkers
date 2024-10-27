import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button/ShadcnButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog';
import Dropdown from '@/components/common/Dropdown';
import IconAndText from '@/components/common/IconAndText';
import { useDeleteTask, useTaskDetail } from '@/queries/tasks.queries';
import { useTaskStore } from '@/store/useTaskStore';
import { FrequencyType, Task } from '@/types/tasks.types';
import {
  formatFrequencyToKorean,
  formatKoreanDate,
} from '@/utils/dateTimeUtils/FormatData';
import { cn } from '@/utils/tailwind/cn';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MoreVerticalIcon,
  RepeatIcon,
} from 'lucide-react';
import { useState } from 'react';
import TaskCommentForm from './TaskCommentForm';
import TaskCommentList from './TaskCommentList';
import TaskUpdateForm from './TaskUpdateForm';

function TaskDetailContent({ task }: { task: Task }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const {
    selectedTaskList,
    selectedDate,
    isTaskUpdateFormShow,
    setIsTaskUpdateFormShow,
  } = useTaskStore();
  const { data: taskDetail } = useTaskDetail({
    groupId: selectedTaskList?.groupId ?? -1,
    taskListId: selectedTaskList?.id ?? -1,
    taskId: task.id,
  });
  const { mutate: deleteTask } = useDeleteTask();

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickDropdownUpdate = () => {
    setIsTaskUpdateFormShow(true);
  };

  const handleClickDropdownDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleClickDeleteConfirm = (taskId: number) => {
    deleteTask({
      groupId: selectedTaskList?.groupId ?? -1,
      taskListId: selectedTaskList?.id ?? -1,
      taskId,
      date: selectedDate.toLocaleDateString('ko-KR'),
    });
    setIsDeleteDialogOpen(false);
    setIsTaskUpdateFormShow(false);
  };

  return (
    <section
      className={cn('flex h-full w-full max-w-[45rem] flex-col gap-7 p-4')}
    >
      <article
        className={cn('flex w-full flex-col gap-4', {
          hidden: isTaskUpdateFormShow,
        })}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl-bold">{taskDetail?.name}</h2>
          <Dropdown
            trigger={
              <Button
                variant="ghost"
                className={cn(
                  'size-8 rounded-full p-0',
                  'hover:bg-background-primary/80',
                  'active:bg-background-primary/60'
                )}
              >
                <MoreVerticalIcon className="size-4 text-icon-primary" />
              </Button>
            }
            dropdownStyle="-translate-x-20 w-28"
          >
            <button
              type="button"
              className="h-[36px] text-md-regular text-primary"
              onClick={() => handleClickDropdownUpdate()}
            >
              수정하기
            </button>
            <button
              type="button"
              className="h-[36px] text-md-regular text-status-danger"
              onClick={() => handleClickDropdownDelete()}
            >
              삭제하기
            </button>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Avatar
            src={taskDetail?.writer.image ?? null}
            userNickname={taskDetail?.writer.nickname}
          />
          <p className="text-md-regular text-primary">
            {formatKoreanDate(taskDetail?.updatedAt ?? '')}
          </p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <IconAndText
            wrapperClassName="text-icon-primary"
            textClassName="text-xs-regular"
            icon={<CalendarIcon className="size-4" />}
            text={formatKoreanDate(taskDetail?.date ?? '')}
          />
          <span className="text-icon-primary">|</span>
          <IconAndText
            wrapperClassName="text-icon-primary"
            textClassName="text-xs-regular"
            icon={<RepeatIcon className="size-4" />}
            text={formatFrequencyToKorean(
              taskDetail?.frequency ?? FrequencyType.Once
            )}
          />
        </div>
        <div
          className={cn(
            'overflow-y-scroll break-keep',
            'scrollbar-hide hover:scrollbar-default',
            'text-md-regular text-primary',
            {
              'max-h-[20rem]': !isExpanded,
            }
          )}
        >
          {taskDetail?.description}
        </div>
        <Button
          variant="outline"
          className={cn(
            'h-8 w-full bg-icon-primary/20 text-xs-regular',
            'hover:bg-icon-primary/80 active:bg-icon-primary/60'
          )}
          onClick={handleExpand}
        >
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {isExpanded ? '접기' : '펼치기'}
        </Button>
      </article>
      <TaskUpdateForm
        className={cn({ hidden: !isTaskUpdateFormShow })}
        task={taskDetail ?? task}
      />
      <TaskCommentForm taskId={taskDetail?.id ?? -1} />
      <TaskCommentList taskId={taskDetail?.id ?? -1} />
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>댓글을 삭제하시겠습니까?</DialogTitle>
            <DialogDescription>
              삭제된 댓글은 복구할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleClickDeleteConfirm(task.id ?? -1)}
            >
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default TaskDetailContent;
