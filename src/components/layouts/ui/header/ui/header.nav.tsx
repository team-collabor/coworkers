/* eslint-disable max-len */

import Link from 'next/link';

export default function HeaderNav() {
  return (
    <nav className="scrollbar-none mx-10 hidden h-full md:block">
      <ul className="flex h-full flex-row items-center gap-x-10 whitespace-nowrap">
        <li className="hover:scale-105 hover:opacity-80">
          <Link href="/boards">자유게시판</Link>
        </li>
      </ul>
    </nav>
  );
}
