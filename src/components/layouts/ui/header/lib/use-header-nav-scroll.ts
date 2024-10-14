import { tickFrame } from '@/utils/react/tick-frame';
import { RefObject, useEffect, useState } from 'react';

export const useHeaderNavScroll = <T extends RefObject<HTMLDivElement>>(
  ref: T
) => {
  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  useEffect(() => {
    const mouseDownHandler = (e: MouseEvent) => {
      e.preventDefault();
      if (ref.current) {
        const { current } = ref;
        const target = e.target as HTMLElement;
        if (target.closest('nav')) {
          setIsDown((down) => !down);
          setStartX(() => e.pageX + current.scrollLeft);
        }
      }
    };
    const mouseMoveHandler = tickFrame((e: MouseEvent) => {
      if (ref.current) {
        const { current } = ref;
        const { scrollLeft, scrollWidth, clientWidth } = current;
        if (isDown) {
          current.scrollLeft = startX - e.pageX;
          if (scrollLeft === 0) {
            setStartX(e.pageX);
            return;
          }
          if (scrollWidth <= clientWidth + scrollLeft) {
            setStartX(e.pageX + scrollLeft);
          }
        }
      }
    });
    const mouseUpHandler = () => {
      if (ref.current) {
        setIsDown(false);
      }
    };
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
    return () => {
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [ref, isDown, startX]);
};
