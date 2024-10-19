import { DatePicker } from '@/components/common/DatePicker';
import { useTaskStore } from '@/store/useTaskStore';
import { DayPicker } from 'react-day-picker';

export default function CalendarPage() {
  const { selectedDate } = useTaskStore();
  return (
    <>
      <DatePicker mode="selector" />
      <DatePicker
        mode="input"
        className="w-72"
        initialDate={new Date(selectedDate)}
      />
      <div suppressHydrationWarning>{new Date(selectedDate).toISOString()}</div>
      <DayPicker mode="single" selected={new Date('2024-12-19')} initialFocus />
    </>
  );
}
