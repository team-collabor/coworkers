import { Button } from '@/components/common/Button/ShadcnButton';
import { cn } from '@/utils/tailwind/cn';
import Image from 'next/image';

type SocialSignInBoxProps = {
  className?: string;
};

function SocialSignInBox({ className }: SocialSignInBoxProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center justify-between',
        'rounded-lg bg-background-secondary p-4',
        className
      )}
    >
      <p className="text-lg-semibold text-secondary">간편 로그인하기</p>
      <div className="flex gap-4">
        <Button variant="secondary" size="icon" className="p-0">
          <Image src="/images/Google.svg" alt="google" width={40} height={40} />
        </Button>
        <Button variant="secondary" size="icon" className="p-0">
          <Image
            src="/images/Kakaotalk.svg"
            alt="kakao"
            width={40}
            height={40}
          />
        </Button>
      </div>
    </div>
  );
}

export default SocialSignInBox;
