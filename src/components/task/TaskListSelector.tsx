import { useTaskStore } from '@/store/useTaskStore';
import { TaskList } from '@/types/tasklist.types';
import truncateString from '@/utils/string/truncateString';
import { useEffect } from 'react';
import { cn } from '../../utils/tailwind/cn';
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '../common/Button/Button';
import { Carousel, CarouselContent, CarouselItem } from '../common/Carousel';

type TaskListSelectorProps = {
  taskLists: TaskList[];
};

function TaskListSelector({ taskLists }: TaskListSelectorProps) {
  const { selectedTaskList, setSelectedTaskList } = useTaskStore();

  useEffect(() => {
    // taskLists 배열이 비어있지 않은 경우에만 디폴트로 첫 번째 할 일 목록을 선택
    if (taskLists.length > 0) {
      setSelectedTaskList(taskLists[0]);
    }
  }, [taskLists, setSelectedTaskList]);

  return (
    <Carousel
      className={cn('sticky top-0 w-full bg-background-primary pb-1.5 pt-1.5')}
    >
      <CarouselContent className="-ml-1">
        {taskLists.map((taskList) => (
          <CarouselItem
            key={taskList.id}
            className="pl-3 tab:basis-1/5 mob:basis-1/3 pc:basis-1/6"
          >
            <Button
              className={cn(
                'border-[2px] border-background-tertiary',
                'bg-background-secondary',
                {
                  'border-icon-inverse bg-gray-500 bg-opacity-70':
                    selectedTaskList?.id === taskList.id,
                }
              )}
              buttonStyle={ButtonStyle.Box}
              textColor={TextColor.White}
              textSize={TextSize.Large}
              buttonWidth={ButtonWidth.Full}
              buttonBackgroundColor={ButtonBackgroundColor.None}
              buttonBorderColor={ButtonBorderColor.LightGray}
              buttonPadding={ButtonPadding.Medium}
              onClick={() => {
                setSelectedTaskList(taskList);
              }}
            >
              {truncateString(taskList.name, 10)}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default TaskListSelector;
