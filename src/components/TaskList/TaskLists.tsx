import Badge from '@/components/common/Badge';
import { TaskList } from '@/types/team';
import Image from 'next/image';
import Link from 'next/link';
import VirtualScroll from './VirtualScroll';

interface TaskListProps {
  taskLists: TaskList[];
}

interface TaskItemProps {
  taskList: TaskList;
  taskListColor: string;
}

function TaskItem({ taskList, taskListColor }: TaskItemProps) {
  return (
    <div
      className="relative mb-[12px] flex h-[40px] items-center 
     justify-between rounded-xl bg-secondary px-5"
    >
      <div
        className={`absolute bottom-0 left-0 top-0 
          z-0  w-[0.8rem] rounded-l-xl ${taskListColor}`}
      />
      <span className="text-md-medium">{taskList.name}</span>
      <div className="flex h-[1.5625rem] gap-1">
        <Badge count={1} left={5} />
        <Image
          src="../icons/Kebab_large.svg"
          alt="kebab"
          width={16}
          height={16}
        />
      </div>
    </div>
  );
}

export default function TaskLists({ taskLists }: TaskListProps) {
  const TASK_LIST_COLORS = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
  ];

  return (
    <div className="h-[13rem]">
      <VirtualScroll
        itemHeight={40} // 각 TaskItem의 높이 (패딩과 마진을 고려하여 설정)
        renderAhead={4} // 미리 렌더링할 항목 수
      >
        {taskLists.map((taskList, index) => (
          <Link key={taskList.id} href={`/wines/${taskList.id.toString()}`}>
            <TaskItem
              key={taskList.id}
              taskList={taskList}
              taskListColor={TASK_LIST_COLORS[index % TASK_LIST_COLORS.length]}
            />
          </Link>
        ))}
      </VirtualScroll>
    </div>
  );
}
