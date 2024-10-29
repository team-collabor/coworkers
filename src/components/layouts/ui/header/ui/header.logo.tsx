import { UnoptimizedImage } from '@/components/next';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';

export default function HeaderLogo(props: HTMLAttributes<HTMLImageElement>) {
  return (
    <Link href="/">
      <UnoptimizedImage
        priority
        src="/icons/Logo.svg"
        alt=""
        width={158}
        height={32}
        {...props}
      />
    </Link>
  );
}
