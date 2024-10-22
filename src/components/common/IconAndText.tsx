import { cn } from '@/utils/tailwind/cn';

export default function IconAndText({
  icon,
  text,
  wrapperClassName,
  textClassName,
}: {
  icon: React.ReactNode;
  text: string;
  wrapperClassName?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn('flex items-center gap-1', wrapperClassName)}>
      {icon}
      <span className={cn('flex items-center', textClassName)}>{text}</span>
    </div>
  );
}
