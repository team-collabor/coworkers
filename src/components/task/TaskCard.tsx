import { useDeleteTask } from '@/queries/tasks.queries';
import { useTaskStore } from '@/store/useTaskStore';
import { FrequencyType, Task } from '@/types/tasks.types';
import {
  formatFrequencyToKorean,
  formatKoreanDate,
} from '@/utils/dateTimeUtils/FormatData';
import { cn } from '@/utils/tailwind/cn';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@radix-ui/react-dialog';
import {
  CalendarClockIcon,
  MessageSquareIcon,
  MoreVerticalIcon,
  RepeatIcon,
} from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from '../common/Button/ShadcnButton';
import CheckableText from '../common/CheckableText';
import { DialogFooter, DialogHeader } from '../common/Dialog';
import Dropdown from '../common/Dropdown';

type TaskCardProps = {
  task: Task;
  onCheckBoxChange: (taskId: number, done: boolean) => void;
  onClick: () => void;
};

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  ({ task, onCheckBoxChange, onClick }, ref) => {
    const {
      selectedTaskList,
      setIsTaskUpdateFormShow,
      isTaskDeleteDialogOpen,
      setIsTaskDeleteDialogOpen,
      selectedDate,
    } = useTaskStore();
    const { mutate: deleteTask } = useDeleteTask();

    const handleClickDropdownUpdate = (
      e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e?.stopPropagation();
      setIsTaskUpdateFormShow(true);
    };

    const handleClickDropdownDelete = (
      e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e?.stopPropagation();
      e?.preventDefault();
      setIsTaskDeleteDialogOpen(true);
    };

    const handleClickDeleteConfirm = (taskId: number) => {
      deleteTask({
        groupId: selectedTaskList?.groupId ?? -1,
        taskListId: selectedTaskList?.id ?? -1,
        taskId,
        date: selectedDate.toLocaleDateString('ko-KR'),
      });
      setIsTaskDeleteDialogOpen(false);
      setIsTaskUpdateFormShow(false);
    };

    return (
      <>
        <div
          className={cn(
            'flex w-full flex-col items-start rounded-lg bg-secondary',
            'gap-[0.625rem] px-[0.875rem] py-3',
            'cursor-pointer',
            'hover:bg-select'
          )}
          key={task.id}
          ref={ref}
          onClick={onClick}
        >
          <div className={cn('flex w-full items-center justify-between')}>
            <div className="flex w-full items-center justify-start gap-3">
              <CheckableText
                isChecked={task.doneAt !== null}
                onChange={() => {
                  onCheckBoxChange(task.id, !task.doneAt);
                }}
              >
                {task.name}
              </CheckableText>
              <div
                className={cn(
                  'text-sm-regular flex items-center gap-1 text-default'
                )}
              >
                <MessageSquareIcon className="size-4 text-icon-primary" />
                {task.commentCount}
              </div>
            </div>
            <Dropdown
              trigger={
                <div
                  className={cn(
                    'rounded-full p-1',
                    'hover:bg-tertiary active:bg-select'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreVerticalIcon className="size-4 text-icon-primary" />
                </div>
              }
              dropdownStyle="-translate-x-20 w-28"
            >
              <button
                type="button"
                className="h-[36px] text-md-regular text-primary"
                onClick={(e) => handleClickDropdownUpdate(e)}
              >
                수정하기
              </button>
              <button
                type="button"
                className="h-[36px] text-md-regular text-status-danger"
                onClick={(e) => handleClickDropdownDelete(e)}
              >
                삭제하기
              </button>
            </Dropdown>
          </div>
          <div
            className={cn(
              'ml-2 flex items-center justify-center gap-[0.625rem]'
            )}
          >
            <div className="flex items-center gap-1">
              <CalendarClockIcon className="size-4 text-icon-primary" />
              <span className="text-xs-regular text-default">
                {formatKoreanDate(task.date)}
              </span>
            </div>
            {task.frequency !== FrequencyType.Once && (
              <>
                <span className="text-xs-regular text-default">|</span>
                <div className="flex items-center gap-1">
                  <RepeatIcon className="size-4 text-icon-primary" />
                  <span className="text-xs-regular text-default">
                    {formatFrequencyToKorean(task.frequency)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <Dialog
          open={isTaskDeleteDialogOpen}
          onOpenChange={setIsTaskDeleteDialogOpen}
        >
          <DialogContent className="w-80">
            <DialogHeader>
              <DialogTitle>할 일을 삭제하시겠습니까?</DialogTitle>
              <DialogDescription>
                삭제된 할 일은 복구할 수 없습니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setIsTaskDeleteDialogOpen(false)}
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
      </>
    );
  }
);

export default TaskCard;
