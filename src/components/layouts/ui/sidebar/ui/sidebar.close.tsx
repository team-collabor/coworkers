import Image from 'next/image';

import { useSidebarStore } from '../model/sidebar.store';

const SidebarClose = () => {
  const { close } = useSidebarStore();
  return (
    <button
      type="button"
      className="absolute right-0 -translate-x-4 translate-y-4 md:hidden"
      onClick={close}
    >
      <Image src="/icons/X.svg" alt="" width={24} height={24} />
    </button>
  );
};

export default SidebarClose;
