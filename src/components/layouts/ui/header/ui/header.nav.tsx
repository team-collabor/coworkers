/* eslint-disable max-len */

import {
  LayoutContext,
  TLayoutContext,
} from '@/components/layouts/model/layout.context';
import { useContextSelector } from '@/hooks/context/use-context-selector';
import Link from 'next/link';
import { Context, useRef } from 'react';
import { useHeaderNavScroll } from '../lib/use-header-nav-scroll';
import HeaderNavSkeleton from './header.nav.skeleton';

export default function HeaderNav() {
  const ref = useRef<HTMLDivElement>(null);
  useHeaderNavScroll(ref);
  const { groups } = useContextSelector(
    LayoutContext as Context<TLayoutContext>
  );
  const { data, isLoading } = groups;

  if (isLoading) {
    return <HeaderNavSkeleton />;
  }

  return (
    <nav
      className="scrollbar-none mx-10 hidden h-full md:block"
      ref={ref}
      data-d="false"
    >
      <ul className="flex h-full flex-row items-center gap-x-10 whitespace-nowrap">
        {data?.map(({ id, name }) => {
          return (
            <li key={id}>
              <button type="button">{name}</button>
            </li>
          );
        })}
        <li className="hover:scale-105 hover:opacity-80">
          <Link href="/boards">자유게시판</Link>
        </li>
      </ul>
    </nav>
  );
}