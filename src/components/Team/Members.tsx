import useIsMobile from '@/hooks/useIsMobile';
import { Member } from '@/types/team';
import Image from 'next/image';

interface MemberProps {
  member: Member;
}
interface MembersProps {
  members: Member[];
}

function MemberItem({ member }: MemberProps) {
  const isMobileView = useIsMobile();
  return (
    <div>
      {isMobileView ? (
        <div
          className="flex h-[74px] max-w-[384px] 
    items-center justify-between rounded-xl bg-secondary px-6 "
        >
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={
                  member.userImage ? member.userImage : '../icons/Member.svg'
                }
                alt="user"
                width={24}
                height={24}
              />
              <span className="text-md-medium">{member.userName}</span>
            </div>
            <span className="text-xs-regular">{member.userEmail} </span>
          </div>
          <Image
            src="../icons/Kebab_large.svg"
            alt="kebab"
            width={16}
            height={16}
          />
        </div>
      ) : (
        <div
          className="flex h-[74px] max-w-[384px] 
items-center justify-between rounded-xl bg-secondary px-6 "
        >
          <div className="flex gap-4 mob:items-center">
            <Image
              src={member.userImage ? member.userImage : '../icons/Member.svg'}
              alt="user"
              width={32}
              height={32}
            />
            <div className="flex flex-col gap-1">
              <span className="text-md-medium">{member.userName}</span>
              <span className="text-xs-regular">{member.userEmail}</span>
            </div>
          </div>

          <Image
            src="../icons/Kebab_large.svg"
            alt="kebab"
            width={16}
            height={16}
          />
        </div>
      )}
    </div>
  );
}

export default function Members({ members }: MembersProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mob:grid-cols-2">
      {members.map((member) => (
        <div key={member.userId}>
          <MemberItem member={member} />
        </div>
      ))}
    </div>
  );
}
