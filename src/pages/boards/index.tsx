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
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function Boards() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { user } = useAuthStore();
  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchValue(inputValue);
    }
  };

  return (
    <>
      <h1 className="my-10 self-start text-2xl-bold ">자유게시판</h1>
      <Input
        placeholder="검색어를 입력해주세요."
        value={inputValue}
        onChange={handleInputValueChange}
        onKeyDown={handleSearchKeyDown}
      />
      <BestArticlesSection />
      <AllArticlesSection searchValue={searchValue} />
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
