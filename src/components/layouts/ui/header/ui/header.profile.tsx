/* eslint-disable max-len */

import { useRootContext } from '@/components/layouts/model/root.context';
import HeaderProfileSkeleton from './header.profile.skeleton';
import ProfileModal from './profile.modal';

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
      <ProfileModal user={user.data} />
      <span className="w-0 cursor-pointer overflow-hidden text-md-medium hover:scale-105 md:w-auto">
        {user.data?.nickname}
      </span>
    </div>
  );
}
