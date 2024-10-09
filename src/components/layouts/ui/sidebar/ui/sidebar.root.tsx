import clsx from 'clsx';

import { useSidebarStore } from '../model/sidebar.store';
import SidebarClose from './sidebar.close';

const SidebarRoot = () => {
  const { isClosed } = useSidebarStore();
  return (
    <div
      className={clsx(
        'top-header absolute left-0 h-screen w-1/3 min-w-max bg-tertiary transition-all duration-100 ease-in-out',
        {
          'md:-translate-x-full': !isClosed,
          '-translate-x-full': isClosed,
        }
      )}
    >
      <SidebarClose />
      <ul className="relative grid translate-x-4 translate-y-[4.6875rem] grid-flow-row auto-rows-fr gap-y-6 text-md-medium">
        <li>
          <button type="button" className="" aria-label="경영관리팀">
            <span>경영관리팀</span>
          </button>
        </li>
        <li>
          <button type="button" className="" aria-label="경영관리팀">
            <span>경영관리팀</span>
          </button>
        </li>
        <li>
          <button type="button" className="" aria-label="경영관리팀">
            <span>자유게시판</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarRoot;
