import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/common/Dialog';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useToast } from '@/hooks/useToast';
import { Member } from '@/types/dto/responses/group.response.types';
import { DialogTitle } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MemberDropDown from './MemberDropDown';
import Pagination from './Pagination';

export interface MemberProps {
  member: Member;
  isAdmin?: boolean;
}
interface MembersProps {
  members: Member[];
  isAdmin: boolean;
}

function MemberItem({ member, isAdmin }: MemberProps) {
  const isMobileView = useIsMobile();
  const { toast } = useToast();
  const [isMemberModal, setIsMemberModal] = useState(false);

  const handleEmailCopy = () => {
    navigator.clipboard
      .writeText(member.userEmail)
      .then(() => {
        toast({
          title: '이메일이 클립보드에 복사되었습니다.',
        });
      })
      .catch(() => {
        toast({
          title: '이메일 복사 실패',
          variant: 'destructive',
        });
      });
    setIsMemberModal(false);
  };

  return (
    <div>
      {isMobileView ? (
        <div
          className="flex h-[74px] w-full items-center justify-between 
    rounded-xl bg-secondary px-6 "
          onClick={() => {
            setIsMemberModal(true);
          }}
        >
          <div className="flex w-full flex-col items-start gap-1">
            <div className="flex w-full items-center gap-2">
              <div
                className="flex h-[24px] w-[24px] items-center
             overflow-hidden rounded-full border-2 border-primary "
              >
                <Image
                  src={
                    member.userImage ? member.userImage : '/icons/Member.svg'
                  }
                  alt="user"
                  width={24}
                  height={24}
                  style={{ width: '24px', height: '24px' }}
                />
              </div>
              <span className="truncate text-md-medium">{member.userName}</span>
            </div>
            <span className="truncate text-xs-regular">{member.userEmail}</span>
          </div>
          {isAdmin && <MemberDropDown member={member} />}
        </div>
      ) : (
        <div
          className="flex h-[74px] w-full
items-center justify-between rounded-xl bg-secondary px-6 "
          onClick={() => {
            setIsMemberModal(true);
          }}
        >
          <div className="flex gap-4 mob:items-center">
            <div
              className="flex h-[32px] w-[32px] items-center
             overflow-hidden rounded-full border-2 border-primary "
            >
              <Image
                src={member.userImage ? member.userImage : '/icons/Member.svg'}
                alt="user"
                width={32}
                height={32}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-md-medium">{member.userName}</span>
              <span className="text-xs-regular">{member.userEmail}</span>
            </div>
          </div>
          {isAdmin && <MemberDropDown member={member} />}
        </div>
      )}

      <Dialog open={isMemberModal} onOpenChange={setIsMemberModal}>
        <DialogContent className="w-90 fixed">
          <DialogHeader className="items-center">
            <div className="flex w-[20rem] flex-col items-center gap-5">
              <div
                className="flex h-[52px] w-[52px] items-center
             overflow-hidden rounded-full border-2 border-primary "
              >
                <Image
                  src={
                    member.userImage ? member.userImage : '/icons/Member.svg'
                  }
                  alt="user"
                  width={52}
                  height={52}
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <DialogTitle className="truncate text-lg-medium ">
                  {member.userName}
                </DialogTitle>
                <span className="truncate text-md-regular ">
                  {member.userEmail}
                </span>
                <DialogDescription>
                  멤버의 이메일을 복사할 수 있습니다.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              buttonStyle={ButtonStyle.Box}
              textColor={TextColor.White}
              textSize={TextSize.Large}
              buttonWidth={ButtonWidth.Full}
              buttonBackgroundColor={ButtonBackgroundColor.Green}
              buttonBorderColor={ButtonBorderColor.Green}
              buttonPadding={ButtonPadding.Medium}
              onClick={handleEmailCopy}
            >
              이메일 복사하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Members({ members, isAdmin }: MembersProps) {
  const isMobileView = useIsMobile();
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const containerHeight = members.length <= 3 ? 'h-[5.5rem]' : 'h-[11rem]';

  useEffect(() => {
    if (isMobileView) {
      setLimit(4);
    } else {
      setLimit(6);
    }
  }, [isMobileView]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`grid w-full grid-cols-3 gap-3 overflow-y-auto 
          mob:grid-cols-2 ${containerHeight}`}
      >
        {members.slice(offset, offset + limit).map((member) => (
          <MemberItem key={member.userId} member={member} isAdmin={isAdmin} />
        ))}
      </div>
      <Pagination
        total={members.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
