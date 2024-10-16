import React, { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  itemHeight: number; // TaskItem 하나의 높이
  renderAhead?: number; // 미리 렌더링할 아이템 수
};
export default function VirtualScroll({
  children,
  itemHeight,
  renderAhead = 0,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollTop(scrollRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      setViewportHeight(ref.clientHeight);
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const containerHeight = itemHeight * React.Children.count(children);

  const startIndex = Math.max(
    Math.floor(scrollTop / itemHeight) - renderAhead,
    0
  );

  const endIndex = Math.min(
    Math.ceil(viewportHeight / itemHeight + startIndex) + renderAhead,
    React.Children.count(children)
  );

  const visibleItems = React.Children.toArray(children).slice(
    startIndex,
    endIndex
  );

  const translateY = itemHeight * startIndex;

  return (
    <div className="h-full overflow-y-auto" ref={scrollRef}>
      <div style={{ height: `${containerHeight}px`, position: 'relative' }}>
        <div style={{ transform: `translateY(${translateY}px)` }}>
          {visibleItems}
        </div>
      </div>
    </div>
  );
}
