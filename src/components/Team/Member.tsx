import Image from 'next/image';

export default function Member() {
  return (
    <div
      className="flex h-[74px] max-w-[384px] 
    items-center justify-between rounded-xl bg-secondary px-6"
    >
      <div className="flex gap-4">
        <Image src="../icons/Member.svg" alt="user" width={32} height={32} />
        <div className="flex flex-col gap-1">
          <span className="text-md-medium">우지은</span>
          <span className="text-xs-regular">eee@example.com</span>
        </div>
      </div>
      <Image
        src="../icons/Kebab_large.svg"
        alt="kebab"
        width={16}
        height={16}
      />
    </div>
  );
}
