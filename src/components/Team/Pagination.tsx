/* eslint-disable react/no-array-index-key */
import Image from 'next/image';

type Props = {
  total: number;
  limit: number;
  page: number;
  setPage: (state: number) => void;
};

export default function Pagination({ total, limit, page, setPage }: Props) {
  const numPages = Math.ceil(total / limit);

  const handlePage = (i: number) => {
    setPage(i + 1);
  };

  return (
    <div className="my-5 flex w-[100px] gap-2">
      <button
        type="button"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="w-[3rem] disabled:opacity-20"
      >
        <Image src="/icons/Left.svg" alt="leftBtn" width={30} height={30} />
      </button>
      {Array(numPages)
        .fill(0)
        .map((_, i) => (
          <button
            key={i}
            value={i}
            type="button"
            onClick={() => handlePage(i)}
            disabled={page === i + 1} // 현재 페이지 비활성화
            className={` w-[3rem] ${
              page === i + 1
                ? 'cursor-not-allowed opacity-20'
                : 'rounded-2xl text-white hover:bg-gray-300'
            }`}
          >
            <span>{i + 1}</span>
          </button>
        ))}
      <button
        type="button"
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        className="w-[3rem] disabled:opacity-20"
      >
        <Image src="/icons/Right.svg" alt="rightBtn" width={30} height={30} />
      </button>
    </div>
  );
}
