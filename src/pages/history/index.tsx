import { UnoptimizedImage } from '@/components/next';
import { useGetHistory } from '@/queries/users.queries';
import { TTaskDone } from '@/types/temp.types';
import { cn } from '@/utils/tailwind/cn';
import { NoneHistory } from './NoneHistory';

const parseDate = (date: string) => {
  const [year, month, day] = date.match(/\d+/g)?.map(Number) as number[];
  return new Date(year, month - 1, day);
};

export default function History() {
  const { data } = useGetHistory();
  if (!data || data.tasksDone.length === 0) {
    return <NoneHistory />;
  }
  const { tasksDone } = data;
  const tasksByDate = tasksDone.reduce((acc, task) => {
    const date = new Date(task.date);
    const key = [
      `${date.getFullYear()}년 `,
      `${date.getMonth() + 1}월 `,
      `${date.getDate()}일`,
    ].join('');
    acc.set(key, [...(acc.get(key) || []), task]);
    return acc;
  }, new Map<string, TTaskDone[]>());
  const sortedTasksByDate = Array.from(tasksByDate.entries()).sort((t1, t2) => {
    return parseDate(t1[0]).getTime() - parseDate(t2[0]).getTime();
  });
  return (
    <>
      <h1 className="mb-6 mt-10 self-start text-xl font-bold">마이 히스토리</h1>
      <ul className="mb-16 flex w-full flex-col gap-y-10 self-start">
        {sortedTasksByDate.map(([key, taskList]: [string, TTaskDone[]]) => {
          return (
            <li key={key}>
              <h2 className="mb-4">{key}</h2>
              <ul className="flex flex-col gap-y-4">
                {taskList
                  .sort((t1, t2) => t1.displayIndex - t2.displayIndex)
                  .map((task) => (
                    <li
                      key={task.id}
                      className={cn(
                        'flex rounded-lg bg-tertiary',
                        'gap-x-2 px-[0.875rem] py-[0.625rem]'
                      )}
                    >
                      <UnoptimizedImage
                        src="/icons/Checkbox_active.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                      <p>
                        <del>{task.name}</del>
                      </p>
                    </li>
                  ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}
