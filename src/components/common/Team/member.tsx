import Image from 'next/image';

export default function Member() {
  return (
    <div
      className="flex h-[74px] w-[100px] 
    items-center justify-between rounded-xl bg-secondary px-5"
    >
      Member
      <Image
        src="../icons/Kebab_large.svg"
        alt="kebab"
        width={16}
        height={16}
      />
    </div>
  );
}
