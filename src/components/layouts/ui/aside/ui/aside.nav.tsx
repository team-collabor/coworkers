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
  const { data, isLoading } = useContextSelector(
    LayoutContext as Context<TLayoutContext>
  );
  const defaultItemClassName = 'hover:opacity-80';
  return isLoading ? (
    <AsideNavSkeleton />
  ) : (
    <ul className="mt-16 flex flex-col gap-y-6 p-4 text-md-medium text-primary">
      {data?.map(({ id, name }) => {
        return (
          <li key={id} className="flex justify-between">
            <button
              type="button"
              className={`${defaultItemClassName} hover:scale-105`}
            >
              <span>{name}</span>
            </button>
            <button type="button" className={defaultItemClassName}>
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
      <li className={`${defaultItemClassName} hover:scale-105`}>
        <Link href="/boards">자유게시판</Link>
      </li>
    </ul>
  );
}
