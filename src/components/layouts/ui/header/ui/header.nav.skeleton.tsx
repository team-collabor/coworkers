/* eslint-disable max-len */
export default function HeaderNavSkeleton() {
  return (
    <nav className="use-scrollbar-none mx-10 hidden h-full md:block">
      <ul className="flex h-full flex-row items-center gap-x-10 whitespace-nowrap">
        <li className="skeleton h-6 min-w-24" />
        <li className="skeleton h-6 min-w-24" />
      </ul>
    </nav>
  );
}
