import { cn } from '@/utils/tailwind/cn';

export default function NoneHistory() {
  return (
    <main
      className={cn([
        'absolute inset-0 flex items-center justify-center',
        'font-medium text-default',
      ])}
    >
      아직 히스토리가 없습니다.
    </main>
  );
}
