/* eslint-disable prettier/prettier */
export default function AsideNavSkeleton() {
  return (
    <ul className="mt-16 flex flex-col gap-y-6 p-4">
      {Array.from({ length: 5 }, () => {
        return <li className="skeleton relative h-6 w-3/5 overflow-hidden" />;
      })}
    </ul>
  );
}
