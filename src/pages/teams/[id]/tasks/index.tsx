import { DatePicker } from '@/components/common/DatePicker';
import AddTaskListModal from '@/components/task/AddTaskListModal';
import AddTaskModal from '@/components/task/AddTaskModal';
import DeleteTaskModal from '@/components/task/DeleteTaskModal';
import Tasks from '@/components/task/Tasks';
import { useTeamQuery } from '@/queries/groups.queries';
import { useTaskStore } from '@/store/useTaskStore';
import { cn } from '@/utils/tailwind/cn';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: team,
    isLoading: isTeamLoading,
    isFetched: isTeamFetched,
  } = useTeamQuery(Number(id));
  const { setSelectedDate } = useTaskStore();

  const handleDateChange = (date: Date) => {
    date.setHours(date.getHours() + 9);
    setSelectedDate(date);
  };

  return (
    <>
      <Head>
        <title>{team?.name} 할 일 관리 - Coworkers</title>
        <meta
          name="description"
          content="팀과 함께 해야 할 일을 관리하고 팀원의 협업 상태를 파악해 보세요."
        />
        <meta property="og:title" content="할 일 관리 - Coworkers" />
        <meta
          property="og:description"
          content="팀과 함께 해야 할 일 목록을 관리하세요."
        />
        <meta
          property="og:url"
          content={`https://coworkers-colla.netlify.app/${team?.id}/tasks`}
        />
      </Head>
      <section className="mt-10 flex w-full tab:mt-6">
        <h1 className="text-xl-bold text-primary">할 일</h1>
      </section>
      <section
        className={cn(
          'mt-7 flex w-full items-center justify-between mob:flex-col mob:gap-4'
        )}
      >
        <DatePicker mode="selector" onDateChange={handleDateChange} />
        <AddTaskListModal groupId={Number(id)} />
      </section>
      <Tasks
        team={team}
        isTeamLoading={isTeamLoading}
        isTeamFetched={isTeamFetched}
      />
      {team?.taskLists.length !== 0 && <AddTaskModal />}
      <DeleteTaskModal />
    </>
  );
}
