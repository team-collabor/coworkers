import { useTeamQuery } from '@/queries/groups.queries';
import { useTasks, useUpdateTaskStatus } from '@/queries/tasks.queries';
import { useTaskStore } from '@/store/useTaskStore';
import { FrequencyType, Task } from '@/types/tasks.types';
import {
  formatFrequencyToKorean,
  formatKoreanDate,
} from '@/utils/dateTimeUtils/FormatData';
import { cn } from '@/utils/tailwind/cn';
import {
  CalendarClockIcon,
  Loader2,
  MessageSquareIcon,
  MoreVerticalIcon,
  RepeatIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { Button } from '../common/Button/ShadcnButton';
import CheckableText from '../common/CheckableText';
import TaskListSelector from './TaskListSelector';

function Tasks() {
  const { id } = useRouter().query;
  const { selectedDate, selectedTaskList } = useTaskStore();
  const {
    team,
    isLoading: isTeamLoading,
    isFetched: isTeamFetched,
  } = useTeamQuery(Number(id));
  const { data: tasks, isFetched: isTasksFetched } = useTasks({
    groupId: Number(id),
    taskListId: selectedTaskList?.id ?? 0,
    date: new Date(selectedDate).toISOString(),
  });
  const { mutate: updateTaskStatus } = useUpdateTaskStatus();

  if (isTeamLoading) {
    return (
      <div
        className={cn(
          'flex h-[72vh] w-full items-center justify-center',
          'text-center text-lg-medium text-tertiary'
        )}
      >
        <Loader2 className={cn('size-8 animate-spin text-icon-brand')} />
      </div>
    );
  }

  if (team && !team.taskLists.length && isTeamFetched) {
    return (
      <div
        className={cn(
          'flex h-[72vh] w-full items-center justify-center',
          'text-center text-lg-medium text-tertiary'
        )}
      >
        아직 할 일 목록이 없습니다.
        <br />
        새로운 목록을 추가해주세요.
      </div>
    );
  }

  if (!team && isTeamFetched) {
    return (
      <div
        className={cn(
          'flex h-[72vh] w-full items-center justify-center',
          'text-center text-lg-medium text-tertiary'
        )}
      >
        존재하지 않는 팀입니다.
      </div>
    );
  }

  if (!team) return null;
  return (
    <section className="mt-7 flex w-full flex-col gap-4">
      <TaskListSelector taskLists={team.taskLists} />
      {isTasksFetched &&
        tasks &&
        tasks.length > 0 &&
        tasks.map((task: Task) => (
          <div
            className={cn(
              'flex w-full flex-col items-start rounded-lg bg-secondary',
              'gap-[0.625rem] px-[0.875rem] py-3'
            )}
            key={task.id}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center justify-start gap-3">
                <CheckableText
                  isChecked={task.doneAt !== null}
                  onChange={() => {
                    updateTaskStatus({
                      groupId: Number(id),
                      taskListId: selectedTaskList?.id ?? 0,
                      taskId: task.id,
                      done: !task.doneAt,
                      date: new Date(selectedDate).toLocaleDateString('ko-KR'),
                    });
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
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-full p-0',
                  'hover:bg-tertiary active:bg-select'
                )}
                onClick={() => {}}
              >
                <MoreVerticalIcon className="size-4 text-icon-primary" />
              </Button>
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
        ))}
      {isTasksFetched && tasks && tasks.length === 0 && (
        <div
          className={cn(
            'flex h-[72vh] w-full items-center justify-center',
            'text-center text-lg-medium text-tertiary'
          )}
        >
          할 일이 없습니다.
          <br />
          새로운 할 일을 추가해주세요.
        </div>
      )}
    </section>
  );
}

export default Tasks;
