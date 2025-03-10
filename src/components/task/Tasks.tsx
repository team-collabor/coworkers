import { useTasks, useUpdateTaskStatus } from '@/queries/tasks.queries';
import { useTaskStore } from '@/store/useTaskStore';
import { GetGroupResponse } from '@/types/dto/responses/group.response.types';
import { Task } from '@/types/tasks.types';
import { addNineHours } from '@/utils/dateTimeUtils/addNineHours';
import { cn } from '@/utils/tailwind/cn';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import TaskCard from './TaskCard';
import TaskListSelector from './TaskListSelector';
import TaskDetailModal from './taskDetail/TaskDetailModal';

type TasksProps = {
  team: GetGroupResponse | undefined;
  isTeamLoading: boolean;
  isTeamFetched: boolean;
};

function Tasks({ team, isTeamLoading, isTeamFetched }: TasksProps) {
  const { id } = useRouter().query;
  const {
    selectedDate,
    selectedTask,
    setSelectedTask,
    selectedTaskList,
    taskDetailModalOpen,
    setTaskDetailModalOpen,
  } = useTaskStore();
  const { data: tasks, isFetched: isTasksFetched } = useTasks({
    groupId: Number(id),
    taskListId: selectedTaskList?.id ?? 0,
    date: addNineHours(selectedDate).toISOString(),
  });
  const { mutate: updateTaskStatus } = useUpdateTaskStatus();

  const handleCheckBoxChange = (taskId: number, done: boolean) => {
    updateTaskStatus({
      groupId: Number(id),
      taskListId: selectedTaskList?.id ?? 0,
      taskId,
      done,
      startDate: addNineHours(selectedDate).toISOString(),
    });
  };

  if (isTeamLoading) {
    return (
      <div
        className={cn(
          'flex h-[72vh] w-full items-center justify-center',
          'text-center text-lg-medium text-tertiary'
        )}
      >
        <Loader2 className={cn('animate-spin size-8 text-icon-brand')} />
      </div>
    );
  }

  if (team && !team.taskLists.length && isTeamFetched) {
    return (
      <div
        className={cn(
          'flex h-[72vh] w-full items-center justify-center mob:h-[50vh]',
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
          'flex h-[72vh] w-full items-center justify-center mob:h-[50vh]',
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
          <TaskCard
            key={task.id}
            task={task}
            onCheckBoxChange={handleCheckBoxChange}
            onClick={() => {
              setSelectedTask(task);
              setTaskDetailModalOpen(true);
            }}
          />
        ))}
      <TaskDetailModal
        task={selectedTask}
        open={taskDetailModalOpen}
        setOpen={setTaskDetailModalOpen}
      />
      {isTasksFetched && tasks && tasks.length === 0 && (
        <div
          className={cn(
            'flex h-[72vh] w-full items-center justify-center mob:h-[40vh]',
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
