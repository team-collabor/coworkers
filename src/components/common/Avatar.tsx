import { cn } from '@/utils/tailwind/cn';
import Image from 'next/image';
import { forwardRef } from 'react';

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  src: string | null;
  userNickname?: string;
  nicknameClassName?: string;
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, userNickname, nicknameClassName, ...props }, ref) => {
    const imageSrc = src ?? '/icons/Member.svg';
    return (
      <div className={cn('flex items-center gap-3', className)} {...props}>
        <div ref={ref}>
          <Image
            className="rounded-full"
            src={imageSrc}
            alt="유저 프로필 이미지"
            width={40}
            height={40}
          />
        </div>
        {userNickname && (
          <p className={cn('text-md-medium text-primary', nicknameClassName)}>
            {userNickname}
          </p>
        )}
      </div>
    );
  }
);

export default Avatar;
