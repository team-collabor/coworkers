/* eslint-disable no-console */
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import { Modal } from '@/components/modal';
import useIsMobile from '@/hooks/useIsMobile';
import { Member } from '@/types/dto/responses/group.response.types';
import Image from 'next/image';

interface MemberProps {
  member: Member;
}
interface MembersProps {
  members: Member[];
}

function MemberItem({ member }: MemberProps) {
  const isMobileView = useIsMobile();

  const handleEmailCopy = () => {
    navigator.clipboard
      .writeText(member.userEmail)
      .then(() => {
        console.log('이메일이 클립보드에 복사되었습니다.');
      })
      .catch((err) => {
        console.error('클립보드 복사 실패:', err);
      });
  };

  return (
    <div>
      <Modal>
        {isMobileView ? (
          <Modal.Toggle
            className="flex h-[74px] w-full
    items-center justify-between rounded-xl bg-secondary px-6 "
          >
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src={
                    member.userImage ? member.userImage : '/icons/Member.svg'
                  }
                  alt="user"
                  width={24}
                  height={24}
                  style={{ width: '24px', height: '24px' }}
                />
                <span className="text-md-medium">{member.userName}</span>
              </div>
              <span className="text-xs-regular">{member.userEmail} </span>
            </div>
            <Image
              src="/icons/Kebab_large.svg"
              alt="kebab"
              width={16}
              height={16}
            />
          </Modal.Toggle>
        ) : (
          <Modal.Toggle
            className="flex h-[74px] w-full
items-center justify-between rounded-xl bg-secondary px-6 "
          >
            <div className="flex gap-4 mob:items-center">
              <Image
                src={member.userImage ? member.userImage : '/icons/Member.svg'}
                alt="user"
                width={32}
                height={32}
                style={{ width: 'auto', height: 'auto' }}
              />
              <div className="flex flex-col items-start gap-1">
                <span className="text-md-medium">{member.userName}</span>
                <span className="text-xs-regular">{member.userEmail}</span>
              </div>
            </div>

            <Image
              src="/icons/Kebab_large.svg"
              alt="kebab"
              width={16}
              height={16}
            />
          </Modal.Toggle>
        )}

        <Modal.Portal>
          <Modal.Overlay />
          <Modal.Content withToggle>
            <div className="flex flex-col gap-5">
              <Modal.Header>
                <Modal.Title>
                  <div className="flex w-[20rem] flex-col items-center gap-5">
                    <Image
                      src={
                        member.userImage
                          ? member.userImage
                          : '/icons/Member.svg'
                      }
                      alt="user"
                      width={52}
                      height={52}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg-medium">{member.userName}</span>
                      <span className="text-md-regular">
                        {member.userEmail}
                      </span>
                    </div>
                  </div>
                </Modal.Title>
              </Modal.Header>

              <Modal.Toggle>
                <div>
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
                </div>
              </Modal.Toggle>
            </div>
          </Modal.Content>
        </Modal.Portal>
      </Modal>
    </div>
  );
}

export default function Members({ members }: MembersProps) {
  return (
    <div
      className="mb-10 grid h-[10rem] grid-cols-3 gap-3
    overflow-y-auto mob:grid-cols-2"
    >
      {members.map((member) => (
        <MemberItem key={member.userId} member={member} />
      ))}
    </div>
  );
}
