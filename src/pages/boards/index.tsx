/* eslint-disable max-len */
import AllArticlesSection from '@/components/board/AllArticles/AllArticlesSection';
import BestArticlesSection from '@/components/board/BestArticles/BestArticlesSection';
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import Input from '@/components/common/Input';
import { useAuthStore } from '@/store/useAuthStore';
import { useBoardStore } from '@/store/useBoardStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Boards() {
  const router = useRouter();
  const { searchValue, setSearchValue, setSearchQuery, setOrderBy } =
    useBoardStore();
  const { user } = useAuthStore();
  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchValue);
      router.replace(
        {
          query: {
            ...router.query,
            search: searchValue || undefined,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  useEffect(() => {
    setSearchValue((router.query.search as string) || '');
  }, [router.query.search, setSearchValue]);

  useEffect(() => {
    if (!router.query.orderBy && !router.query.search) {
      setOrderBy('recent');
      setSearchValue('');
      setSearchQuery('');
    }
  }, [
    router.query.orderBy,
    router.query.search,
    setOrderBy,
    setSearchValue,
    setSearchQuery,
  ]);

  return (
    <>
      <h1 className="my-10 self-start text-2xl-bold ">자유게시판</h1>
      <Input
        placeholder="검색어를 입력해주세요."
        value={searchValue}
        onChange={handleInputValueChange}
        onKeyDown={handleSearchKeyDown}
      />
      <BestArticlesSection />
      <AllArticlesSection />
      {user && (
        <Link href="/addboard">
          <Button
            className="fixed tab:bottom-20 tab:right-5 pc:bottom-10 pc:right-10"
            buttonStyle={ButtonStyle.Floating}
            buttonBackgroundColor={ButtonBackgroundColor.Green}
            buttonBorderColor={ButtonBorderColor.None}
            textColor={TextColor.White}
            textSize={TextSize.Large}
            buttonWidth={ButtonWidth.Fit}
            buttonPadding={ButtonPadding.Large}
          >
            <Image src="/icons/Plus.svg" alt="plus" width={16} height={16} />
            <p>글쓰기</p>
          </Button>
        </Link>
      )}
    </>
  );
}
export default Boards;
