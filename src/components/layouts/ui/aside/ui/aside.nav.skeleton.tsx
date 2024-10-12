const shimmer = `
  before:absolute before:-translate-x-full before:content-[''] before:inset-0
  before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r 
  before:from-slate-800 before:via-slate-700 before:to-slate-800
`;

export default function AsideNavSkeleton() {
  return (
    <ul className="mt-16 flex flex-col gap-y-6 p-4">
      {Array.from({ length: 5 }, () => {
        return (
          <li
            className={`
              relative h-6 w-3/5 overflow-hidden bg-slate-800
              ${shimmer}
          `}
          />
        );
      })}
    </ul>
  );
}
