import { useDeleteMember } from '@/queries/groups.queries';
import Image from 'next/image';
import Dropdown from '../common/Dropdown';
import { MemberProps } from './Members';

export default function MemberDropDown({ member }: MemberProps) {
  const deleteMember = useDeleteMember();

  const handleDeleteMember = () => {
    deleteMember.mutate({
      groupId: member.groupId,
      memberUserId: member.userId,
    });
  };

  return (
    <Dropdown
      trigger={
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg p-1 hover:bg-tertiary"
        >
          <Image
            src="/icons/Kebab_large.svg"
            alt="kebab"
            width={20}
            height={20}
          />
        </button>
      }
      dropdownStyle="transform translate-x-[-80%] z-20 relative"
    >
      <button
        type="button"
        className=" h-[35px] w-full "
        onClick={handleDeleteMember}
      >
        삭제하기
      </button>
    </Dropdown>
  );
}
