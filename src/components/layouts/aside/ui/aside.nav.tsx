import Link from 'next/link';

/* eslint-disable max-len */
export default function AsideNav() {
  const defaultItemClassName = 'hover:opacity-80';
  return (
    <ul className="mt-16 flex flex-col gap-y-6 p-4 text-md-medium text-primary">
      <li className={defaultItemClassName}>
        <Link href="/boards">자유게시판</Link>
      </li>
    </ul>
  );
}
