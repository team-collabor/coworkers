import Link from 'next/link';

/* eslint-disable max-len */
export default function AsideNav() {
  return (
    <ul
      className={`
      relative flex translate-y-16 flex-col gap-y-6 
      p-4 text-md-medium text-primary
    `}
    >
      {/* <li key={m.groupId} className="flex justify-between gap-x-4">
        <button type="button" className="hover:scale-105 hover:opacity-80">
          <span>{m.group.name}</span>
        </button>
        <button type="button" className="hover:opacity-80">
          <UnoptimizedImage
            src="/icons/Kebab_large.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
      </li> */}
      <li className="hover:scale-105 hover:opacity-80">
        <Link href="/boards">자유게시판</Link>
      </li>
    </ul>
  );
}
