import { useToast } from '@/hooks/useToast';
import { useTaskListMutation } from '@/queries/taskList.queries';
import { cn } from '@/utils/tailwind/cn';
import { CalendarPlusIcon } from 'lucide-react';
import { useRef } from 'react';
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '../common/Button/Button';
import IconAndText from '../common/IconAndText';
import Input from '../common/Input';
import { Modal } from '../modal';

type AddTaskListModalProps = {
  groupId: number;
};

function AddTaskListModal({ groupId }: AddTaskListModalProps) {
  const taskListNameRef = useRef<HTMLInputElement>(null);
  const createTaskList = useTaskListMutation();
  const { toast } = useToast();

  const handleAddTaskList = () => {
    const taskListName = taskListNameRef.current?.value.trim() || '';

    if (taskListName) {
      createTaskList.mutate(
        { groupId, name: taskListName },
        {
          onSuccess: () => {
            toast({
              title: '목록생성 완료',
              description: '새 목록이 생성되었습니다',
            });
          },
          onError: () => {
            toast({
              title: '목록생성 실패',
              variant: 'destructive',
            });
          },
        }
      );
      if (taskListNameRef.current) {
        taskListNameRef.current.value = '';
      }
    } else {
      toast({
        title: '목록생성 실패',
        description: '할 일 목록명을 입력해주세요.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Modal>
      <Modal.Toggle>
        <IconAndText
          wrapperClassName={cn(
            'text-brand-primary',
            'hover:text-brand-primary/80 active:text-brand-primary/60'
          )}
          icon={<CalendarPlusIcon className="size-4" />}
          text="새로운 목록 추가하기"
        />
      </Modal.Toggle>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content withToggle>
          <div className="flex flex-col gap-5">
            <Modal.Header>
              <Modal.Title>할 일 목록</Modal.Title>
            </Modal.Header>
            <Input
              id="task-list-name"
              wrapperClassName="w-[280px]"
              placeholder="목록 명을 입력해주세요"
              ref={taskListNameRef}
            />
            <Modal.Submit>
              <Button
                buttonStyle={ButtonStyle.Box}
                textColor={TextColor.White}
                textSize={TextSize.Large}
                buttonWidth={ButtonWidth.Full}
                buttonBackgroundColor={ButtonBackgroundColor.Green}
                buttonBorderColor={ButtonBorderColor.Green}
                buttonPadding={ButtonPadding.Medium}
                onClick={handleAddTaskList}
              >
                만들기
              </Button>
            </Modal.Submit>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
}

export default AddTaskListModal;
