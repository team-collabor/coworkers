import { UnoptimizedImage } from '@/components/common/next';
import {
  LayoutContext,
  TLayoutContext,
} from '@/components/layouts/model/layout.context';
import { useContextSelector } from '@/hooks/context/use-context-selector';
import Link from 'next/link';
import { Context } from 'react';
import AsideNavSkeleton from './aside.nav.skeleton';

/* eslint-disable max-len */
export default function AsideNav() {
  const { groups } = useContextSelector(
    LayoutContext as Context<TLayoutContext>
  );
  const { data, isLoading } = groups;
  return isLoading ? (
    <AsideNavSkeleton />
  ) : (
    <ul className="relative flex translate-y-16 flex-col gap-y-6 p-4 text-md-medium text-primary">
      {data?.map(({ id, name }) => {
        return (
          <li key={id} className="flex justify-between">
            <button type="button" className="hover:scale-105 hover:opacity-80">
              <span>{name}</span>
            </button>
            <button type="button" className="hover:opacity-80">
              <UnoptimizedImage
                src="/icons/Kebab_large.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </li>
        );
      })}
      <li className="hover:scale-105 hover:opacity-80">
        <Link href="/boards">자유게시판</Link>
      </li>
    </ul>
  );
}
