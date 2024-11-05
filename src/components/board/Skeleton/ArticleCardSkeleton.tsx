function ArticleCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex h-[176px] w-full flex-col justify-between 
      rounded-xl border border-solid border-tertiary bg-secondary
      px-8 py-6 mob:px-4 mob:py-4 ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <div
            className="skeleton h-6 w-[15rem] rounded 
          mob:h-5 mob:w-[10rem]"
          />
          <div
            className="skeleton h-6 w-[12rem] rounded 
          mob:h-5 mob:w-[8rem]"
          />
        </div>
        <div className="flex items-start gap-3">
          <div
            className="skeleton h-[4.5rem] w-[4.5rem] rounded mob:h-[3.5rem] 
          mob:w-[3.5rem]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8 mob:gap-4">
          <div
            className="skeleton h-[2rem] w-[2rem] rounded-full 
          mob:h-[1.5rem] mob:w-[1.5rem]"
          />
          <div className="skeleton h-5 w-24 rounded mob:h-4 mob:w-16" />
          <div className="skeleton h-5 w-20 rounded mob:h-4 mob:w-14" />
        </div>
      </div>
    </div>
  );
}

export default ArticleCardSkeleton;
