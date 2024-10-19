import { DatePicker } from '@/components/common/DatePicker';

export default function CalendarPage() {
  return (
    <>
      <DatePicker mode="selector" />
      <DatePicker mode="input" />
    </>
  );
}
