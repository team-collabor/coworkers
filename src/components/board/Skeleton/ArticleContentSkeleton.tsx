function ArticleContentSkeleton() {
  return (
    <div className="relative flex flex-col gap-6 rounded-2xl bg-secondary p-6">
      <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gray-700" />

      <div className="h-[1px] w-full border-b border-primary" />

      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="h-5 w-20 animate-pulse rounded-lg bg-gray-700" />
          <div className="h-5 w-24 animate-pulse rounded-lg bg-gray-700" />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-700" />
          <div className="h-4 w-4 animate-pulse rounded bg-gray-700" />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex w-full flex-col gap-2">
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-700" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-700" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-700" />
        </div>
        <div
          className="h-[100px] w-[100px] animate-pulse rounded-lg 
        bg-gray-700"
        />
      </div>
    </div>
  );
}

export default ArticleContentSkeleton;
