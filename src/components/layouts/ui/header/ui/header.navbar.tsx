import { UnoptimizedImage } from '@/components/common/UnoptimizedImage';
import { useEffect, useRef, useState } from 'react';

function Navbar() {
  const [navEvent, setNavEvent] = useState<{
    isDrag: boolean;
    startX: number;
  }>({
    isDrag: false,
    startX: 0,
  });
  const navElementRef = useRef<HTMLElement>(null);
  const navEventRef = useRef(navEvent);

  useEffect(() => {
    navEventRef.current = navEvent;
  }, [navEvent]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent): void => {
      e.preventDefault();
      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
      const navElement = elementUnderMouse?.closest('nav.use-scrollbar-none');
      if (navElement) {
        setNavEvent(() => ({
          startX: e.pageX + navElement.scrollLeft,
          isDrag: true,
        }));
      }
    };
    const onMouseMove = (e: MouseEvent): void => {
      if (navEventRef.current.isDrag && navElementRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = navElementRef.current;
        const { startX } = navEventRef.current;
        navElementRef.current.scrollLeft = startX - e.pageX;
        if (scrollLeft === 0) {
          setNavEvent((prevState) => ({ ...prevState, startX: e.pageX }));
        } else if (scrollWidth <= clientWidth + scrollLeft) {
          setNavEvent((prevState) => ({
            ...prevState,
            startX: e.pageX + scrollLeft,
          }));
        }
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onMouseUp = (_: MouseEvent): void => {
      setNavEvent((prevState) => ({ ...prevState, isDrag: false }));
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <nav
      className="use-scrollbar-none hidden select-none md:block"
      ref={navElementRef}
    >
      <ul className="grid auto-cols-max grid-flow-col gap-x-8">
        <li>
          <button
            type="button"
            className="flex items-center gap-x-[0.6875rem]"
            aria-label="경영관리팀"
          >
            <span>경영관리팀</span>
            <UnoptimizedImage src="/icons/arrow.svg" alt="" />
          </button>
        </li>
        <li>
          <span>자유게시판</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
