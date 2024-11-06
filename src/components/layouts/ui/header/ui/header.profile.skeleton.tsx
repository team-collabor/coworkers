/* eslint-disable max-len */
export default function HeaderProfileSkeleton() {
  return (
    <div
      className={`
        ml-auto flex min-w-max items-center gap-x-2 transition-all duration-500 ease-in-out
        hover:opacity-80 md:mr-4 xl:mr-0
      `}
    >
      <div className="skeleton size-6" />
      <div className="md:skeleton w-0 md:h-6 md:w-12" />
    </div>
  );
}
