import { UnoptimizedImage } from '@/components/common/UnoptimizedImage';
import { SidebarStore } from '../model/Sidebar.store';

function SidebarClose() {
  const { close } = SidebarStore();
  return (
    <button
      type="button"
      className="absolute right-0 -translate-x-4 translate-y-4 md:hidden"
      onClick={close}
    >
      <UnoptimizedImage src="/icons/X.svg" alt="" width={24} height={24} />
    </button>
  );
}

export default SidebarClose;
