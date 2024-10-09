import clsx from 'clsx';

import { UnoptimizedImage } from '@/components/common/UnoptimizedImage';
import { Sidebar } from '../../sidebar';
import { SidebarStore } from '../../sidebar/model/Sidebar.store';

function List() {
  const { isClosed } = SidebarStore();
  return (
    <button
      type="button"
      className={clsx('w-6 transition-all duration-100 ease-in-out md:w-0', {
        'rotate-90': !isClosed,
      })}
    >
      <Sidebar.Toggle>
        <UnoptimizedImage
          className="hover:scale-105"
          src="/icons/Gnb_menu.svg"
          alt=""
          width={24}
          height={24}
        />
      </Sidebar.Toggle>
    </button>
  );
}

export default List;
