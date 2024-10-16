/* eslint-disable max-len */

import { useRootContext } from '@/components/layouts/model/root.context';
import { Modal } from '@/components/modal';
import { UnoptimizedImage } from '@/components/next';
import HeaderProfileSkeleton from './header.profile.skeleton';

export default function HeaderProfile() {
  const { user } = useRootContext();
  if (user.loading) {
    return <HeaderProfileSkeleton />;
  }
  return (
    <div
      className={`
    ml-auto flex min-w-max items-center gap-x-2 transition-all duration-500 ease-in-out
    hover:opacity-80 md:mr-4 xl:mr-0
    `}
    >
      <Modal>
        <Modal.Toggle>
          <UnoptimizedImage
            className="cursor-pointer hover:scale-110"
            src="/icons/User_large.svg"
            alt=""
            width={24}
            height={24}
          />
        </Modal.Toggle>
        <Modal.Portal>
          <Modal.Overlay />
          <Modal.Content withToggle>
            <Modal.Header>
              <Modal.Title>프로필</Modal.Title>
              <Modal.Summary>{user.data?.data?.email}</Modal.Summary>
            </Modal.Header>
          </Modal.Content>
        </Modal.Portal>
      </Modal>
      <span className="w-0 cursor-pointer overflow-hidden text-md-medium hover:scale-105 md:w-auto">
        {user.data?.data?.nickname}
      </span>
    </div>
  );
}
