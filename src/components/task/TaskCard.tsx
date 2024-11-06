import { useTaskStore } from '@/store/useTaskStore';
import { FrequencyType, Task } from '@/types/tasks.types';
import {
  formatFrequencyToKorean,
  formatKoreanDate,
} from '@/utils/dateTimeUtils/FormatData';
import { cn } from '@/utils/tailwind/cn';
import {
  CalendarClockIcon,
  MessageSquareIcon,
  MoreVerticalIcon,
  RepeatIcon,
} from 'lucide-react';
import { forwardRef } from 'react';
import CheckableText from '../common/CheckableText';
import Dropdown from '../common/Dropdown';

type TaskCardProps = {
  task: Task;
  onCheckBoxChange: (taskId: number, done: boolean) => void;
  onClick: () => void;
};

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  ({ task, onCheckBoxChange, onClick }, ref) => {
    const {
      setIsTaskUpdateFormShow,
      setIsTaskDeleteDialogOpen,
      setSelectedTask,
      setTaskDetailModalOpen,
    } = useTaskStore();

    const handleClickDropdownUpdate = (
      e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e?.stopPropagation();
      setSelectedTask(task);
      setTaskDetailModalOpen(true);
      setIsTaskUpdateFormShow(true);
    };

    const handleClickDropdownDelete = (
      e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e?.stopPropagation();
      e?.preventDefault();
      setSelectedTask(task);
      setIsTaskDeleteDialogOpen(true);
    };

    return (
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
          className={cn('ml-2 flex items-center justify-center gap-[0.625rem]')}
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
    );
  }
);

export default TaskCard;
