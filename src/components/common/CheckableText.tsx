import { cn } from '@/utils/tailwind/cn';

type CheckableTextProps = {
  children: React.ReactNode;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CheckableText({ children, isChecked, onChange }: CheckableTextProps) {
  return (
    <div className="flex items-center rounded-lg bg-transparent p-2.5">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          e.stopPropagation();
        }}
        className={cn(
          'h-5 w-5 cursor-pointer appearance-none rounded-md',
          'border-2 border-icon-inverse',
          'hover:border-brand-tertiary',
          'checked:border-none checked:bg-brand-tertiary',
          'checked:hover:bg-opacity-80',
          'active:border-opacity-60 checked:active:bg-opacity-60'
        )}
      />
      <span
        className={cn(
          'ml-2 text-sm-medium text-primary',
          isChecked ? 'line-through' : ''
        )}
      >
        {children}
      </span>
    </div>
  );
}

export default CheckableText;
