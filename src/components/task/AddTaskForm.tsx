import { FrequencyType } from '@/types/tasks.types';
import { formatFrequencyToKorean } from '@/utils/dateTimeUtils/FormatData';
import { DatePicker } from '../common/DatePicker';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import TaskFrequencyInput from './TaskFrequencyInput';

function AddTaskForm() {
  return (
    <form className="my-4 flex flex-col gap-7">
      <Input label="할 일 제목" placeholder="할 일 제목을 입력해주세요." />
      <div className="flex w-full flex-col gap-3">
        <p className="text-lg-medium text-primary">시작 날짜 및 시간</p>
        <DatePicker
          mode="input"
          popoverContentClassName="border-[1px] border-green-400"
        />
      </div>
      <Select id="select" label="반복 설정" selectClassName="bg-select">
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
      <TaskFrequencyInput label="반복 요일" />
      <TextArea
        label="할 일 설명"
        placeholder="할 일 설명을 입력해주세요."
        textAreaClassName="resize-none"
        rows={2}
      />
    </form>
  );
}

export default AddTaskForm;
