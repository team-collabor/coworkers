import { DatePicker } from '@/components/common/DatePicker';
import AddTaskListModal from '@/components/task/AddTaskListModal';
import AddTaskModal from '@/components/task/AddTaskModal';
import Tasks from '@/components/task/Tasks';
import { useTeamQuery } from '@/queries/groups.queries';
import { cn } from '@/utils/tailwind/cn';
import { useRouter } from 'next/router';

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: team,
    isLoading: isTeamLoading,
    isFetched: isTeamFetched,
  } = useTeamQuery(Number(id));

  return (
    <>
      <section className="mt-10 flex w-full tab:mt-6">
        <h1 className="text-xl-bold text-primary">할 일</h1>
      </section>
      <section
        className={cn(
          'mt-7 flex w-full items-center justify-between mob:flex-col mob:gap-4'
        )}
      >
        <DatePicker mode="selector" />
        <AddTaskListModal groupId={Number(id)} />
      </section>
      <Tasks
        team={team}
        isTeamLoading={isTeamLoading}
        isTeamFetched={isTeamFetched}
      />
      {team?.taskLists.length !== 0 && <AddTaskModal />}
    </>
  );
}
