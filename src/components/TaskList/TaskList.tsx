import Badge from '@/components/common/Badge';
import Image from 'next/image';

export default function TaskList() {
  return (
    <div
      className="relative flex h-[2.5rem]
items-center justify-between  rounded-xl bg-secondary px-5"
    >
      <div
        className="absolute bottom-0 left-0 
  top-0 z-0 w-[0.8rem] 
  rounded-l-xl bg-point-purple"
      />
      <span className="text-md-medium">법인 설립</span>
      <div className="flex h-[1.5625rem] gap-1">
        <Badge count={1} left={5} />
        <Image
          src="../icons/Kebab_large.svg"
          alt="kebab"
          width={16}
          height={16}
        />
      </div>
    </div>
  );
}
