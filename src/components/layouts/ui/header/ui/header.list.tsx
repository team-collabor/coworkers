import clsx from 'clsx';
import Image from 'next/image';

import { Sidebar } from '../../sidebar';
import { useSidebarStore } from '../../sidebar/model/sidebar.store';

function List() {
  const { isClosed } = useSidebarStore();
  return (
    <button
      type="button"
      className={clsx('w-6 transition-all duration-100 ease-in-out md:w-0', {
        'rotate-90': !isClosed,
      })}
    >
      <Sidebar.Toggle>
        <Image
          className="hover:scale-105"
          src="/icons/Gnb_menu.svg"
          alt=""
          width={24}
          height={24}
        />
      </Sidebar.Toggle>
    </button>
  );
};

export default List;
