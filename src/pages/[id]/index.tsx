import DropDown from '@/components/common/dropdown';
import TaskList from '@/components/TaskList/TaskList';
import Member from '@/components/Team/Member';
import CircularProgressChart from '@/components/Team/Progress';
import { useTeamQuery } from '@/queries/groups.quries';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function TeamPage() {
  const router = useRouter();
  const { id } = router.query;

  const { team, isError } = useTeamQuery(Number(id));

  if (isError || !team) {
    return <p>팀 정보를 불러오는 데 실패했습니다.</p>;
  }
  return (
    <div className="flex w-full flex-col gap-5 px-20 pt-10">
      <div
        className="flex h-[4rem] items-center
     justify-between  rounded-xl border border-primary bg-secondary px-5"
      >
        <p className="text-xl-bold">TeamPage {team?.name}</p>

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

      <TaskList />

      <p className="text-lg-medium">리포트</p>
      <div
        className="flex h-[13.5625rem] items-center
     justify-between rounded-xl bg-secondary px-5"
      >
        <CircularProgressChart />

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
            <Image src="../images/Done.svg" alt="done" width={40} height={40} />
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
