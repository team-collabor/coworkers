import Image from 'next/image';

function Logo() {
  return (
    <div>
      <Image src="/icons/Logo.svg" alt="" width={158} height={32} priority />
    </div>
  );
}

export default Logo;
