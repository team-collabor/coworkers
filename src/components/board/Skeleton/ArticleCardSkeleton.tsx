function ArticleCardSkeleton() {
  return (
    <div
      className="relative flex h-[176px] w-full flex-col justify-between 
      rounded-xl border border-solid border-tertiary bg-secondary
      px-8 py-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-6 w-[15rem] rounded" />
          <div className="skeleton h-6 w-[12rem] rounded" />
        </div>
        <div className="flex items-start gap-3">
          <div className="skeleton h-[4.5rem] w-[4.5rem] rounded" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="skeleton h-[2rem] w-[2rem] rounded-full" />
          <div className="skeleton h-5 w-24 rounded" />
          <div className="skeleton h-5 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}

export default ArticleCardSkeleton;
