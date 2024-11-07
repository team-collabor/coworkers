import { useAuthStore } from '@/store/useAuthStore';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();

  const handlePageChange = () => {
    if (!user) {
      router.push('/signin');
    } else {
      router.push('/withoutteam');
    }
  };

  return (
    <div>
      <div
        className={`m-0 box-border flex w-screen
        flex-col items-center overflow-x-hidden
    `}
      >
        <div
          className={`mb-[3.75rem] flex h-[67.5rem] w-screen flex-col
             justify-between bg-trainLarge bg-cover bg-center
          bg-no-repeat pb-[7.59375rem] pt-[5.25rem] tab:mb-0 tab:h-[58.75rem]
         tab:bg-trainMedium tab:pb-[7.375rem]
         tab:pt-[6.25rem] mob:h-[40rem] mob:bg-trainSmall
          mob:pb-12 mob:pt-[3.4375rem]
         `}
        >
          <div
            className={`flex flex-col 
            items-center justify-center gap-5 font-sans
            font-bold leading-none tab:gap-2 mob:gap-1
             `}
          >
            <h1
              className={`flex items-center justify-center gap-6 
              text-center text-[3rem] tab:gap-4
              tab:text-[2.5rem] mob:gap-1 mob:text-[1.81rem]`}
            >
              함께 만들어가는 투두 리스트
              <Image
                src="icons/FIx_large.svg"
                alt="Fix"
                height={56}
                width={56}
                className={`tab:h-[3rem] tab:w-[3rem]
                mob:h-7 mob:w-7
                `}
              />
            </h1>
            <h1
              className={`flex
                 bg-gradient-to-r from-brand-primary to-brand-tertiary 
                   bg-clip-text text-[4rem] text-transparent
                   tab:text-[3rem] mob:text-[2rem]
                `}
            >
              Coworkers
            </h1>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className={`h-[2.8125rem] w-[23.3125rem] rounded-full
                bg-gradient-to-r from-brand-primary to-brand-tertiary 
                text-base font-bold mob:w-[21.4375rem]
                `}
              onClick={handlePageChange}
            >
              지금 시작하기
            </button>
          </div>
        </div>

        <div
          className={` flex flex-col items-center
          gap-20 tab:gap-6
        `}
        >
          <div
            className={`h-[26.19rem] w-[62.75rem] 
             rounded-[2.5rem] bg-gradient-to-r
              from-brand-primary to-brand-tertiary
        p-[1px] shadow-[0_0_15px_rgba(255,255,255,0.5)] 
        tab:h-[22.13rem] tab:w-[43.5rem]
        mob:h-[29.1875rem] mob:w-[21.4375rem]
       `}
          >
            <div
              className={`flex h-full w-full
                flex-wrap-reverse justify-center gap-[12rem]
           rounded-[2.5rem] bg-primary tab:gap-[6.25rem] mob:items-start
           mob:justify-normal mob:gap-0 mob:pl-[3.125rem]`}
            >
              <Image
                src="images/Landing_mockup_list.svg"
                alt="List"
                width={291}
                height={338}
                className={`place-self-end
               tab:h-[16.875rem]
               tab:w-[14.25rem] mob:h-[17.0625rem]
               mob:w-[14.6875rem]
                `}
              />
              <div
                className={`flex flex-col items-start
                justify-center gap-4 font-bold leading-7 tab:gap-3
              `}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center 
            rounded-xl border-[1px]
            border-primary bg-secondary
            shadow-[0_0_5px_rgba(0,0,0,0.5)]
            `}
                >
                  <Image
                    src="images/Landing_folder.svg"
                    alt="folder"
                    height={24}
                    width={24}
                  />
                </div>
                <p
                  className={`flex
                text-2xl  tab:text-[1.13rem]
                tab:leading-[1.31rem]`}
                >
                  그룹으로
                  <br /> 할 일을 관리하세요
                </p>
              </div>
            </div>
          </div>

          <div
            className={`flex h-[26.19rem] w-[62.75rem] flex-wrap-reverse
             justify-center gap-[12rem] rounded-[2.5rem]
              border-[1px] border-primary
             bg-secondary tab:h-[22.13rem] tab:w-[43.5rem] tab:gap-[6.25rem]
             mob:h-[29.1875rem] mob:w-[21.4375rem] mob:items-end
           mob:justify-normal mob:gap-0 mob:pl-[3.125rem]
          `}
          >
            <div
              className={`flex flex-col items-end justify-center gap-4
              text-right font-bold leading-7 tab:gap-3 mob:items-start 
              mob:text-left
          `}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center 
            rounded-xl border-[1px]
            border-primary bg-secondary
            shadow-[0_0_5px_rgba(0,0,0,0.5)]
            `}
              >
                <Image
                  src="images/Landing_email.svg"
                  alt="email"
                  height={24}
                  width={24}
                />
              </div>
              <p
                className={`text-2xl  
                tab:text-[1.13rem] tab:leading-[1.31rem]`}
              >
                간단하게 멤버들을
                <br />
                초대하세요
              </p>
            </div>
            <Image
              src="images/Landing_mockup_invite.svg"
              alt="Invite"
              width={291}
              height={338}
              className={`place-self-start tab:h-[16.875rem]
                tab:w-[14.25rem] mob:h-[17.0625rem]
                mob:w-[14.6875rem]
                `}
            />
          </div>

          <div
            className={`flex h-[26.19rem] 
          w-[62.75rem] flex-wrap justify-center gap-[12rem]
             rounded-[2.5rem] 
             bg-slate-950 tab:h-[22.13rem] tab:w-[43.5rem] 
             tab:gap-[6.25rem]
             mob:h-[29.1875rem] mob:w-[21.4375rem]
          mob:items-start mob:justify-normal mob:gap-0 mob:pl-[3.125rem]
          `}
          >
            <Image
              src="/images/Landing_mockup_comment.svg"
              alt="Invite"
              width={291}
              height={338}
              className={`place-self-start tab:h-[16.875rem]
                tab:w-[14.25rem] mob:h-[17.0625rem]
                mob:w-[14.6875rem]
                `}
            />
            <div
              className={`flex flex-col items-start justify-center gap-4 
                font-bold leading-7 tab:gap-3
          `}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center 
            rounded-xl border-[1px]
            border-primary bg-secondary
            shadow-[0_0_5px_rgba(0,0,0,0.5)]
            `}
              >
                <Image
                  src="images/Landing_check.svg"
                  alt="Email"
                  height={24}
                  width={24}
                />
              </div>
              <p
                className={`text-2xl 
                tab:text-[1.13rem] tab:leading-[1.31rem]
               `}
              >
                할 일도 간편하게
                <br />
                체크해요
              </p>
            </div>
          </div>
        </div>

        <div
          className={`flex h-[67.5rem] w-screen justify-center
          bg-trafficLarge bg-cover bg-center bg-no-repeat
          pt-[14.375rem] tab:h-[58.75rem] tab:bg-trafficMedium
          tab:pt-[11rem] mob:h-[40rem]
          mob:bg-trafficSmall mob:pt-[7.6875rem]
        `}
        >
          <div
            className={`flex flex-col gap-6 text-center
         font-sans font-bold mob:gap-4`}
          >
            <h1
              className={`text-4xl mob:text-2xl
          `}
            >
              지금 바로 시작해보세요
            </h1>
            <div
              className={`text-2xl mob:text-base
          `}
            >
              팀원 모두와 같은 방향,
              <span
                className={`mob:block
              `}
              />
              같은 속도로 나아가는 가장 쉬운 방법
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
