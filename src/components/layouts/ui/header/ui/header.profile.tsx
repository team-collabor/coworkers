/* eslint-disable max-len */
import { UnoptimizedImage } from '@/components/common/next';
import {
  LayoutContext,
  TLayoutContext,
} from '@/components/layouts/model/layout.context';
import { useContextSelector } from '@/hooks/context/use-context-selector';
import { Context } from 'react';
import HeaderProfileSkeleton from './header.profile.skeleton';

export default function HeaderProfile() {
  const { user } = useContextSelector(LayoutContext as Context<TLayoutContext>);
  return user ? (
    <div
      className={`
        ml-auto flex min-w-max items-center gap-x-2 transition-all duration-500 ease-in-out
        hover:opacity-80 md:mr-4 xl:mr-0
        `}
    >
      <UnoptimizedImage
        className="cursor-pointer hover:scale-110"
        src="/icons/User_large.svg"
        alt=""
        width={24}
        height={24}
      />
      <span className="w-0 cursor-pointer overflow-hidden text-md-medium hover:scale-105 md:w-auto">
        {user.nickname}
      </span>
    </div>
  ) : (
    <HeaderProfileSkeleton />
  );
}
