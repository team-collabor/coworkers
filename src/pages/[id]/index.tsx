import DropDown from '@/components/common/dropdown';
import Member from '@/components/common/Team/member';
import Image from 'next/image';

export default function TeamPage() {
  return (
    <div className="flex w-full flex-col gap-5 px-20 pt-10">
      <div
        className="flex h-[4rem] items-center
     justify-between  rounded-xl border border-primary bg-secondary px-5"
      >
        <p className="text-xl-bold">TeamPage</p>

        <div className="flex items-center gap-7">
          <Image
            src="../images/Thumbnail_team.svg"
            alt="thumbnail"
            width={181}
            height={64}
          />
          <div className="h-[24px] w-[24px]">
            <DropDown
              dropdownStyle="right-0 z-20"
              childrenStyle=" "
              trigger={
                <button type="button">
                  <Image
                    src="../icons/Gear.svg"
                    alt="setting"
                    width={24}
                    height={24}
                  />
                </button>
              }
            >
              <button className="h-[46px] w-full " type="button">
                수정하기
              </button>
              <button className="h-[46px] w-full " type="button">
                삭제하기
              </button>
            </DropDown>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-lg-medium">할 일 목록</p>
        <button type="button" className="text-brand-primary">
          + 새로운 목록 추가하기
        </button>
      </div>
      <div
        className="relative flex h-[2.5rem]
     items-center justify-between  rounded-xl bg-secondary px-5"
      >
        <div
          className="absolute bottom-0 left-0 
        top-0 z-0 w-[0.8rem] 
        rounded-l-xl bg-point-purple"
        />
        <span className="text-md-medium">법인 설립</span>
        <Image
          src="../icons/Kebab_large.svg"
          alt="kebab"
          width={16}
          height={16}
        />
      </div>

      <p className="text-lg-medium">리포트</p>
      <div
        className="flex h-[13.5625rem] items-center
     justify-between rounded-xl bg-secondary px-5"
      >
        <div>
          <div className="flex items-center ">
            <svg className="h-[169px] w-[169px]" viewBox="0 0 100 100">
              {/* 전체 원 (회색) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="lightgray"
                strokeWidth="18"
              />
              {/* 15% 채워진 부분 (파란색) */}
              <path
                d="M 50 50 m 0,-40 a 40,40 0 1,1 -38.57,10.73"
                fill="none"
                stroke="blue"
                strokeWidth="18"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <p className="text-md-medium">
                오늘의 <br />
                진행 상황
              </p>
              <p className=" text-4xl">0%</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div
            className="flex h-[4.78125rem] w-[25rem] 
           items-center justify-between rounded-xl bg-tertiary p-5"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs-medium text-secondary ">오늘의 할 일</p>
              <p className="text-2xl-bold text-brand-tertiary">0개</p>
            </div>
            <Image src="../images/Todo.svg" alt="todo" width={40} height={40} />
          </div>
          <div
            className="flex h-[4.78125rem] w-[25rem] items-center 
          justify-between rounded-xl bg-tertiary p-5"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs-medium text-secondary ">한 일</p>
              <p className="text-2xl-bold text-brand-tertiary">0개</p>
            </div>
            <Image src="../images/Todo.svg" alt="todo" width={40} height={40} />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <p className="text-lg-medium">멤버</p>
        <button type="button" className="text-brand-primary">
          + 새로운 멤버 초대하기
        </button>
      </div>
      <Member />
    </div>
  );
}
