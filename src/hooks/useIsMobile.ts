import MEDIA_QUERY_BREAK_POINT from '@/constants/mediaQueryBreakPoint';
import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MEDIA_QUERY_BREAK_POINT.MOBILE_MAX_WIDTH) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobileView;
};
