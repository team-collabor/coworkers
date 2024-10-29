import { useTasksQuery } from '@/queries/groups.queries';
import Image from 'next/image';
import CircularProgressChart from './Progress';

interface ReportProps {
  id: number;
}

export default function Report({ id }: ReportProps) {
  const today = new Date().toISOString().split('T')[0];
  const { data: tasks } = useTasksQuery({ id, date: today });

  const TODAY_PROGRESS = tasks?.length
    ? tasks.filter((task) => task.doneAt).length / tasks.length
    : 0;
  const TODAY_PROGRESS_PERCENT = Math.floor(TODAY_PROGRESS * 100);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-lg-medium">리포트</p>
      <div
        className="flex h-[13.5625rem] items-center
   justify-between rounded-xl bg-secondary px-5 mob:gap-5"
      >
        <CircularProgressChart value={TODAY_PROGRESS_PERCENT} />
        <div className="flex w-[25rem] flex-col gap-5 tab:w-[17.5rem]">
          <div
            className="flex h-[4.78125rem] 
         items-center justify-between rounded-xl bg-tertiary p-5"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs-medium text-secondary ">오늘의 할 일</p>
              <p className="text-2xl-bold text-brand-tertiary">
                {tasks?.length}개
              </p>
            </div>
            <Image src="../images/Todo.svg" alt="todo" width={40} height={40} />
          </div>
          <div
            className="flex h-[4.78125rem]  items-center 
        justify-between rounded-xl bg-tertiary p-5"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs-medium text-secondary ">한 일</p>
              <p className="text-2xl-bold text-brand-tertiary">
                {tasks?.filter((task) => task.doneAt).length}개
              </p>
            </div>
            <Image
              src="/images/Done.svg"
              alt="완료된 작업"
              width={40}
              height={40}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
