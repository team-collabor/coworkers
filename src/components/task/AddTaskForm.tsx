import { addTaskSchema } from '@/constants/formSchemas/taskSchema';
import { useAddTask } from '@/queries/tasks.queries';
import { useTaskStore } from '@/store/useTaskStore';
import { AddTaskRequest } from '@/types/dto/requests/tasks.request.types';
import { FrequencyType } from '@/types/tasks.types';
import { formatFrequencyToKorean } from '@/utils/dateTimeUtils/FormatData';
import { cn } from '@/utils/tailwind/cn';
// eslint-disable-next-line import/no-extraneous-dependencies
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
} from '../common/Button/Button';
import DatePickerInput from '../common/DatePickerInput';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import { useModalContext } from '../modal/model/modal.context';
import TaskFrequencyInput from './TaskFrequencyInput';

function AddTaskForm() {
  const { selectedDate, selectedTaskList } = useTaskStore();
  const { mutate: addTask, isSuccess, isPending } = useAddTask();
  const methods = useForm<AddTaskRequest>({
    mode: 'onBlur',
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      name: '',
      startDate: selectedDate.toLocaleDateString('ko-KR'),
      frequencyType: FrequencyType.Once,
      description: '',
      weekDays: [],
      groupId: selectedTaskList?.groupId,
      taskListId: selectedTaskList?.id,
    },
  });
  const { toggle } = useModalContext();

  const watchFrequencyType = methods.watch('frequencyType', FrequencyType.Once);

  const onSubmit = (data: AddTaskRequest) => {
    if (data.frequencyType === FrequencyType.Weekly) {
      delete data.monthDay;
    } else if (data.frequencyType === FrequencyType.Monthly) {
      delete data.weekDays;
    } else {
      delete data.weekDays;
      delete data.monthDay;
    }
    if (selectedTaskList) {
      data.groupId = selectedTaskList.groupId;
      data.taskListId = selectedTaskList.id;
    }
    const startDate = new Date(data.startDate);
    startDate.setHours(startDate.getHours() + 9);
    data.startDate = startDate.toISOString();
    addTask(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toggle();
    }
  }, [isSuccess, toggle]);

  return (
    <FormProvider {...methods}>
      <form
        className="my-4 flex flex-col gap-7"
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
        <DatePickerInput
          label="시작 날짜 및 시간"
          initialDate={new Date(selectedDate.toLocaleDateString('ko-KR'))}
          {...methods.register('startDate')}
          errorMessage={methods.formState.errors.startDate?.message}
        />
        <Select
          id="frequency-select"
          type="text"
          label="반복 설정"
          selectClassName="bg-select"
          {...methods.register('frequencyType')}
        >
          <option value={FrequencyType.Once}>
            {formatFrequencyToKorean(FrequencyType.Once)}
          </option>
          <option value={FrequencyType.Daily}>
            {formatFrequencyToKorean(FrequencyType.Daily)}
          </option>
          <option value={FrequencyType.Weekly}>
            {formatFrequencyToKorean(FrequencyType.Weekly)}
          </option>
          <option value={FrequencyType.Monthly}>
            {formatFrequencyToKorean(FrequencyType.Monthly)}
          </option>
        </Select>
        <TaskFrequencyInput
          wrapperClassName={cn(
            watchFrequencyType !== FrequencyType.Weekly && 'hidden'
          )}
          label="반복 요일"
          errorMessage={methods.formState.errors.weekDays?.message}
        />
        <TextArea
          id="description-input"
          label="할 일 설명"
          placeholder="할 일 설명을 입력해주세요."
          textAreaClassName="resize-none"
          rows={2}
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
        <Button
          type="submit"
          buttonStyle={ButtonStyle.Box}
          buttonWidth={ButtonWidth.Full}
          buttonPadding={ButtonPadding.Large}
          buttonBackgroundColor={ButtonBackgroundColor.Green}
          textColor={TextColor.White}
          textSize={TextSize.Large}
          buttonBorderColor={ButtonBorderColor.None}
          disabled={isPending}
        >
          만들기
        </Button>
      </form>
      <DevTool placement="top-left" control={methods.control} />
    </FormProvider>
  );
}

export default AddTaskForm;
