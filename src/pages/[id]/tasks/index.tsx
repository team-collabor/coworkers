import { DatePicker } from '@/components/common/DatePicker';
import AddTaskListModal from '@/components/task/AddTaskListModal';
import AddTaskModal from '@/components/task/AddTaskModal';
import Tasks from '@/components/task/Tasks';
import { cn } from '@/utils/tailwind/cn';
import { useRouter } from 'next/router';

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;

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
      <Tasks />
      <AddTaskModal />
    </>
  );
}
