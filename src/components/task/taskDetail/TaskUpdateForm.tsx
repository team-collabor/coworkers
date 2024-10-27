/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { updateTaskSchema } from '@/constants/formSchemas/taskSchema';
import { useUpdateTask } from '@/queries/tasks.queries';
import { useTaskStore } from '@/store/useTaskStore';
import { UpdateTaskRequest } from '@/types/dto/requests/tasks.request.types';
import { Task } from '@/types/tasks.types';
import { cn } from '@/utils/tailwind/cn';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '../../common/Button/Button';
import Input from '../../common/Input';
import TextArea from '../../common/TextArea';

type TaskUpdateFormProps = {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  task: Task;
};

function TaskUpdateForm({ className, task }: TaskUpdateFormProps) {
  const { selectedDate, selectedTaskList, setIsTaskUpdateFormShow } =
    useTaskStore();
  const { mutate: updateTask, isSuccess, isPending } = useUpdateTask();
  const methods = useForm<UpdateTaskRequest>({
    mode: 'onBlur',
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      name: task.name ?? '',
      description: task.description ?? '',
      groupId: selectedTaskList?.groupId,
      taskListId: selectedTaskList?.id,
      taskId: task.id,
      date: selectedDate.toISOString(),
    },
  });

  const onSubmit = (data: UpdateTaskRequest) => {
    if (selectedTaskList) {
      data.groupId = selectedTaskList.groupId;
      data.taskListId = selectedTaskList.id;
      data.taskId = task.id;
    }
    updateTask(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsTaskUpdateFormShow(false);
    }
  }, [isSuccess, setIsTaskUpdateFormShow]);

  return (
    <FormProvider {...methods}>
      <form
        className={cn('my-4 flex flex-col gap-7', className)}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          id="title-input"
          type="text"
          label="할 일 제목"
          placeholder="할 일 제목을 입력해주세요."
          {...methods.register('name')}
          errorMessage={methods.formState.errors.name?.message}
        />
        <TextArea
          id="description-input"
          label="할 일 설명"
          placeholder="할 일 설명을 입력해주세요."
          textAreaClassName="resize-none"
          rows={8}
          {...methods.register('description')}
          errorMessage={methods.formState.errors.description?.message}
        />
        <input
          type="number"
          className="hidden"
          {...methods.register('groupId')}
          value={selectedTaskList?.groupId}
        />
        <input
          type="number"
          className="hidden"
          {...methods.register('taskListId')}
          value={selectedTaskList?.id}
        />
        <input
          type="number"
          className="hidden"
          {...methods.register('taskId')}
          value={task.id}
        />
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            className="hover:bg-transparent/10 active:bg-transparent/20"
            buttonStyle={ButtonStyle.Box}
            buttonWidth={ButtonWidth.Fit}
            buttonPadding={ButtonPadding.Large}
            buttonBackgroundColor={ButtonBackgroundColor.None}
            textColor={TextColor.White}
            textSize={TextSize.Large}
            buttonBorderColor={ButtonBorderColor.None}
            onClick={() => setIsTaskUpdateFormShow(false)}
          >
            취소
          </Button>
          <Button
            type="submit"
            buttonStyle={ButtonStyle.Box}
            buttonWidth={ButtonWidth.Fit}
            buttonPadding={ButtonPadding.Large}
            buttonBackgroundColor={ButtonBackgroundColor.Green}
            textColor={TextColor.White}
            textSize={TextSize.Large}
            buttonBorderColor={ButtonBorderColor.None}
            disabled={isPending}
          >
            수정 완료
          </Button>
        </div>
      </form>
      <DevTool placement="top-left" control={methods.control} />
    </FormProvider>
  );
}

export default TaskUpdateForm;
