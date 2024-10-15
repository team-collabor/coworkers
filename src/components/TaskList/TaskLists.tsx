import Badge from '@/components/common/Badge';
import { TaskList } from '@/types/team';
import Image from 'next/image';

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
      className="relative flex  min-h-[2.5rem] 
     items-center justify-between rounded-xl bg-secondary px-5"
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
  const taskListColor = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
  ];

  return (
    <div className="flex max-h-[13rem] flex-col gap-3 overflow-y-auto">
      {taskLists.map((taskList, index) => (
        <TaskItem
          key={taskList.id}
          taskList={taskList}
          taskListColor={taskListColor[index % taskListColor.length]}
        />
      ))}
    </div>
  );
}
