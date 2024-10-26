import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button/ShadcnButton';
import IconAndText from '@/components/common/IconAndText';
import { Task } from '@/types/tasks.types';
import {
  formatFrequencyToKorean,
  formatKoreanDate,
} from '@/utils/dateTimeUtils/FormatData';
import { cn } from '@/utils/tailwind/cn';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MoreVerticalIcon,
  RepeatIcon,
} from 'lucide-react';
import { useState } from 'react';
import TaskCommentForm from './TaskCommentForm';
import TaskCommentList from './TaskCommentList';

function TaskDetailContent({ task }: { task: Task }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className={cn('flex h-full w-full max-w-[45rem] flex-col p-4')}>
      <article className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl-bold">{task.name}</h2>
          <Button
            variant="ghost"
            className={cn(
              'size-8 rounded-full p-0',
              'hover:bg-background-primary/80 active:bg-background-primary/60'
            )}
          >
            <MoreVerticalIcon className="size-4 text-icon-primary" />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Avatar src={task.writer.image} userNickname={task.writer.nickname} />
          <p className="text-md-regular text-primary">
            {formatKoreanDate(task.updatedAt)}
          </p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <IconAndText
            wrapperClassName="text-icon-primary"
            textClassName="text-xs-regular"
            icon={<CalendarIcon className="size-4" />}
            text={formatKoreanDate(task.date)}
          />
          <span className="text-icon-primary">|</span>
          <IconAndText
            wrapperClassName="text-icon-primary"
            textClassName="text-xs-regular"
            icon={<RepeatIcon className="size-4" />}
            text={formatFrequencyToKorean(task.frequency)}
          />
        </div>
        <div
          className={cn(
            'overflow-y-scroll break-keep',
            'scrollbar-hide hover:scrollbar-default',
            'text-md-regular text-primary',
            {
              'max-h-[20rem]': !isExpanded,
            }
          )}
        >
          {task.description}
        </div>
        <Button
          variant="outline"
          className={cn(
            'h-8 w-full bg-icon-primary/20 text-xs-regular',
            'hover:bg-icon-primary/80 active:bg-icon-primary/60'
          )}
          onClick={handleExpand}
        >
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {isExpanded ? '접기' : '펼치기'}
        </Button>
      </article>
      <TaskCommentForm taskId={task.id} />
      <TaskCommentList taskId={task.id} />
    </section>
  );
}

export default TaskDetailContent;
